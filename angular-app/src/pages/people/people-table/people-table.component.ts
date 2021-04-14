import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import {User} from '../../../common/models/user/user';
import { UserService } from '../../../common/services/user/user.service';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import {UserRole} from '../../../common/models/user/role/role';
import {UserAge} from '../../../common/models/user/age/age';
import {MatSelectChange} from '@angular/material/select';

const columns = ['select', 'avatar', 'name', 'role', 'lastLoggedIn',
  'profileViews', 'age', 'country', 'city', 'address', 'phone', 'company', 'connections'];

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
})
export class PeopleTableComponent implements AfterViewInit, OnInit {
  public displayedColumns: string[] = columns;
  public dataSource: MatTableDataSource<User>; // filtered users
  public selection = new SelectionModel<User>(true, []);
  public loader = true;
  private allUsersData!: User[];

  public filters: any = {
    name: '',
    location: '',
    age: '',
    role: ''
  };

  public ages: UserAge[] = [
    { label: 'less than 18', value: 18 },
    { label: 'less than 25', value: 25 },
    { label: 'less than 35', value: 35 },
    { label: 'less than 50', value: 50 },
    { label: 'less than 100', value: 100 },
  ];

  public roles: UserRole[] = [
    { value: 'lawyer' },
    { value: 'client' },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private userService: UserService, private dialog: AddPersonDialogComponent) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.showUsers();
  }

  public handleFilterChange = (event: Event | MatSelectChange, filter: string) => {
    const obj = { ...this.filters };

    if (!(event instanceof MatSelectChange)) {
      obj[filter] = (event.target as HTMLInputElement).value.trim().toLowerCase();
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
    this.filters.name = '';
    this.filters.location = '';
    this.filters.age = '';
    this.filters.role = '';
    this.dataSource.data = this.allUsersData;
  }

  private filterUsers(): User[] {
    return this.allUsersData.filter((user) => {
      const firstname = user.firstName.toLowerCase().includes(this.filters.name.toLowerCase());
      const lastname = user.lastName.toLowerCase().includes(this.filters.name.toLowerCase());
      const city = user.city.toLowerCase().includes(this.filters.location.toLowerCase());
      const country = user.country.toLowerCase().includes(this.filters.location.toLowerCase());
      const age = this.filters.age === '' || user.age < this.filters.age;
      const role = this.filters.role === '' || user.role === this.filters.role;

      return (firstname || lastname) && (city || country) && age && role;
    });
  }

  private showUsers() {
    return this.userService.getUsers()
      .subscribe(users => {
        this.dataSource.data = users;
        this.allUsersData = users;
        this.loader = false;
      });
  }

  public isAllUsersSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllUsersSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public checkboxLabel(user?: User): string {
    if (!user) {
      return `${this.isAllUsersSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(user) ? 'deselect' : 'select'} row ${user.id + 1}`;
  }

  public deleteUsers(): void {
    const selecteds = this.selection.selected;
    selecteds.forEach((person) => this.userService.deleteUser(+person.id).subscribe());

    const selectedIds = selecteds.map((person) => person.id);
    this.dataSource.data = this.dataSource.data
      .filter((person) => !selectedIds.includes(person.id));

    this.selection = new SelectionModel<User>(true, []);
  }

  public openDialog(): void {
    this.dialog.openDialog();
  }
}
