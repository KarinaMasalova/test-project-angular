import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import {UserRole} from "../../../../common/models/user/role/role";
import {UserService} from "../../../../common/services/user/user.service";

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  selectedRole: string | undefined;
  connections = new FormControl();
  connectionsList: Array<any> = [];

  constructor(private userService: UserService) { }

  roles: UserRole[] = [
    {value: 'lawyer'},
    {value: 'client'},
  ];

  getAllConnections() {
    return this.userService.getUsers()
      .subscribe((users) => this.connectionsList = users);
  }

  ngOnInit() {
    this.getAllConnections();
  }
}
