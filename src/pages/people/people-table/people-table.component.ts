import {
  AfterViewInit,
  OnInit,
  OnDestroy,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, filter, map, takeUntil } from 'rxjs/operators';

import { User } from '../../../common/models/user/user';
import { UserService } from '../../../common/services/user/user.service';
import { DialogContentComponent } from '../add-person-dialog-content/dialog-content.component';
import { PeopleStore } from './people.store';
import { SnackbarService } from '../../../common/services/snackbar/snackbar.service';

const columns = [
  'select',
  'avatar',
  'name',
  'userRole',
  'lastLoggedIn',
  'profileViews',
  'age',
  'country',
  'city',
  'address',
  'phone',
  'company',
  'connections',
];

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
  providers: [PeopleStore],
})
export class PeopleTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  public displayedColumns: string[] = columns;
  public users$ = this.peopleStore.users$;
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();
  public usersAmount$ = this.peopleStore.usersAmount$;
  public selection = new SelectionModel<User>(true, []);
  public loading = true;
  private readonly onDestroy$ = new Subject();

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly snackbar: SnackbarService,
    private readonly peopleStore: PeopleStore
  ) {
    this.peopleStore.users$
      .pipe(
        filter((users) => !!users),
        takeUntil(this.onDestroy$)
      )
      .subscribe((users) => {
        this.dataSource.data = users;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public isAllUsersSelected(): Observable<boolean> {
    return this.usersAmount$.pipe(
      map((amount) => this.selection.selected.length === amount),
      takeUntil(this.onDestroy$)
    );
  }

  public toggleCheckbox(): void {
    this.isAllUsersSelected().subscribe((allSelected) =>
      allSelected
        ? this.selection.clear()
        : this.users$.subscribe((users) => this.selection.select(...users))
    );
  }

  public deleteUsers(): void {
    const selectedUsers = this.selection.selected;
    const selectedIds = selectedUsers.map((person) => person.id);
    selectedUsers.forEach((user) =>
      this.userService
        .deleteUser(+user.id)
        .pipe(
          catchError((err) => {
            if (err) {
              this.snackbar.showSnackbar("User wasn't deleted.", 'OK', 5000);
            }
            return throwError(err.statusText);
          })
        )
        .subscribe(() => {
          this.peopleStore.setState((state) => ({
            ...state,
            users: state.users.filter(
              (person) => !selectedIds.includes(person.id)
            ),
          }));
          this.selection = new SelectionModel<User>(true, []);
        })
    );
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent);
    dialogRef.afterClosed().subscribe();
  }

  private getAllUsers(): Subscription {
    return this.userService
      .getUsers()
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((err) => {
          if (err) {
            this.snackbar.showSnackbar(
              "User information wasn't received from the server.",
              'OK',
              5000
            );
          }
          return throwError(err.statusText);
        })
      )
      .subscribe((users) => {
        this.peopleStore.setState((state) => ({
          ...state,
          users,
        }));
        this.loading = false;
      });
  }
}
