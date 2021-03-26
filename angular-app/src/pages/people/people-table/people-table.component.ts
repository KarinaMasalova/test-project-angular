import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {User} from "../../../common/models/user/user";
import { columns } from "../../../common/constants/data";
import { UserService } from "../../../common/services/user/user.service";

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = columns;
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private userService: UserService) {
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

  showUsers() {
    return this.userService.getUsers()
      .subscribe(users => this.dataSource.data = users);
  }

  log(desc: string, val: any) {
    console.log(desc, val);
  }
}
