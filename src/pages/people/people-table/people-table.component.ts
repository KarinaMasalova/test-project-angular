import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User, UserRoles } from '../../../common/models/user/user';
import { UserService } from '../../../common/services/user/user.service';
import { DialogContentComponent } from '../add-person-dialog-content/dialog-content.component';
import { PeopleStore } from './people.store';

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

interface InitialFilters {
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  age: string;
  role: string;
}

const initialFilters: InitialFilters = {
  firstname: '',
  lastname: '',
  country: '',
  city: '',
  age: '',
  role: '',
};

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
  providers: [PeopleStore]
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
  public dataSource: MatTableDataSource<User>; // filtered users
  public selection = new SelectionModel<User>(true, []);
  public loading = true;
  private allUsersData!: User[];

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly peopleStore: PeopleStore
  ) {
    this.dataSource = new MatTableDataSource();
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
    this.dataSource.data = this.allUsersData;
  }

  public onSearchButtonClick(): void {
    this.dataSource.data = this.filterUsers();
  }

  public get isAllUsersSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  public toggleCheckbox(): void {
    return this.isAllUsersSelected
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public deleteUsers(): void {
    const selectedUsers = this.selection.selected;
    const selectedIds = selectedUsers.map((person) => person.id);
    selectedUsers.forEach((person) =>
      this.userService
        .deleteUser(+person.id)
        .pipe(
          tap(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (person) => !selectedIds.includes(person.id)
            );
            this.selection = new SelectionModel<User>(true, []);
          })
        )
        .subscribe()
    );
  }

  public filterUsers(): User[] {
    return this.allUsersData.filter((user) => {
      const firstname = user.firstName
        .toLowerCase()
        .includes(this.filters.firstname.toLowerCase());
      const lastname = user.lastName
        .toLowerCase()
        .includes(this.filters.lastname.toLowerCase());
      const city = user.city
        .toLowerCase()
        .includes(this.filters.city.toLowerCase());
      const country = user.country
        .toLowerCase()
        .includes(this.filters.country.toLowerCase());
      const age = this.filters.age === '' || user.age === +this.filters.age;
      const role = this.filters.role === '' || user.role === this.filters.role;

      return firstname && lastname && city && country && age && role;
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent);
    dialogRef.afterClosed().subscribe();
  }

  private getAllUsers(): Subscription {
    return this.userService
      .getUsers()
      .pipe(
        tap((users) => {
          this.dataSource.data = users;
          this.allUsersData = users;
          this.loading = false;
        })
      )
      .subscribe();
  }
}
