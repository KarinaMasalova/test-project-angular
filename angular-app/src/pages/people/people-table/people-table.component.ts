import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { User, UserAge, UserRoles } from '../../../common/models/user/user';
import { UserService } from '../../../common/services/user/user.service';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import { MatSelectChange } from '@angular/material/select';

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

const initialFilters = {
  name: '',
  location: '',
  age: '',
  role: '',
};

const userAges: UserAge[] = [
  { label: 'less than 18', maxAge: 18 },
  { label: 'less than 25', maxAge: 25 },
  { label: 'less than 35', maxAge: 35 },
  { label: 'less than 50', maxAge: 50 },
  { label: 'less than 100', maxAge: 100 },
];

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
})
export class PeopleTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  public filters: any = initialFilters;
  public ages = userAges;
  public roles = Object.values(UserRoles).filter(
    (i) => !(typeof i === 'number')
  );
  public displayedColumns: string[] = columns;
  public dataSource: MatTableDataSource<User>; // filtered users
  public selection = new SelectionModel<User>(true, []);
  public loading = true;
  private allUsersData!: User[];

  constructor(
    private userService: UserService,
    private dialog: AddPersonDialogComponent
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.showUsers();
  }

  public handleFilterChange = (
    event: Event | MatSelectChange,
    filter: string
  ) => {
    const obj = { ...this.filters };

    if (!(event instanceof MatSelectChange)) {
      obj[
        filter
      ] = (event.target as HTMLInputElement).value.trim().toLowerCase();
    } else {
      obj[filter] = event.value as HTMLSelectElement;
    }

    this.filters = obj;
    this.dataSource.data = this.filterUsers();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  public resetFilters(): void {
    this.filters = initialFilters;
    this.dataSource.data = this.allUsersData;
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
    const selecteds = this.selection.selected;
    const selectedIds = selecteds.map((person) => person.id);
    selecteds.forEach((person) =>
      this.userService.deleteUser(+person.id).subscribe()
    );

    this.dataSource.data = this.dataSource.data.filter(
      (person) => !selectedIds.includes(person.id)
    );

    this.selection = new SelectionModel<User>(true, []);
  }

  public openDialog(): void {
    this.dialog.openDialog();
  }

  public filterUsers(): User[] {
    return this.allUsersData.filter((user) => {
      const firstname = user.firstName
        .toLowerCase()
        .includes(this.filters.name.toLowerCase());
      const lastname = user.lastName
        .toLowerCase()
        .includes(this.filters.name.toLowerCase());
      const city = user.city
        .toLowerCase()
        .includes(this.filters.location.toLowerCase());
      const country = user.country
        .toLowerCase()
        .includes(this.filters.location.toLowerCase());
      const age = this.filters.age === '' || user.age < this.filters.age;
      const role = this.filters.role === '' || user.role === this.filters.role;

      return (firstname || lastname) && (city || country) && age && role;
    });
  }

  private showUsers() {
    return this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
      this.allUsersData = users;
      this.loading = false;
    });
  }
}
