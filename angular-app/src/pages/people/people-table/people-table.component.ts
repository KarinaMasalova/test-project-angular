import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import {User} from "../../../common/models/user/user";
import { columns } from "../../../common/constants/data";
import { UserService } from "../../../common/services/user/user.service";
import { convertTimeStamp } from "../../../common/utils/date";
import { AddPersonDialogComponent } from "../add-person-dialog/add-person-dialog.component";

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = columns;
  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private userService: UserService, private dialog: AddPersonDialogComponent) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.showUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private showUsers() {
    return this.userService.getUsers()
      .subscribe(users => this.dataSource.data = users);
  }

  convertTime(value: number) {
    return convertTimeStamp(value);
  }

  isAllUsersSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllUsersSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(user?: User): string {
    if (!user) {
      return `${this.isAllUsersSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(user) ? 'deselect' : 'select'} row ${user.id + 1}`;
  }

  deleteUsers() {
    const selecteds = this.selection.selected;
    selecteds.forEach((person) => this.userService.deleteUser(+person.id).subscribe());

    const selectedIds = selecteds.map((person) => person.id);
    this.dataSource.data = this.dataSource.data
      .filter((person) => !selectedIds.includes(person.id));
  }

  openDialog() {
    this.dialog.openDialog();
  }
}
