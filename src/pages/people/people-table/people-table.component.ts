import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { User, UserRoles } from '../../../common/models/user/user';
import { UserService } from '../../../common/services/user/user.service';
import { DialogContentComponent } from '../add-person-dialog-content/dialog-content.component';
import { PeopleStore } from './people.store';
import { initialFilters } from '../../../common/models/user/filters';

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
export class PeopleTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  public filters = initialFilters;
  public roles = Object.values(UserRoles).filter(
    (i) => !(typeof i === 'number')
  );
  public displayedColumns: string[] = columns;
  public users$ = this.peopleStore.users$;
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();
  public usersAmount$ = this.peopleStore.usersAmount$;
  public selection = new SelectionModel<User>(true, []);
  public loading = true;

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly peopleStore: PeopleStore
  ) {
    this.peopleStore.users$
      .pipe(filter((users) => !!users))
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

  public resetFilters(): void {
    this.filters = {
      firstname: '',
      lastname: '',
      country: '',
      city: '',
      age: '',
      role: '',
    };
    this.getAllUsers();
  }

  public onSearchButtonClick(): void {
    this.userService
      .getUsersByFilters(this.filters)
      .pipe(
        tap((users) => {
          this.peopleStore.setState((state) => ({
            ...state,
            users,
          }));
        })
      )
      .subscribe();
  }

  public isAllUsersSelected(): Observable<boolean> {
    return this.usersAmount$.pipe(
      map((amount) => this.selection.selected.length === amount)
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
      this.userService.deleteUser(+user.id).subscribe(() => {
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
    return this.userService.getUsers().subscribe((users) => {
      this.peopleStore.setState((state) => ({
        ...state,
        users,
      }));
      this.loading = false;
    });
  }
}
