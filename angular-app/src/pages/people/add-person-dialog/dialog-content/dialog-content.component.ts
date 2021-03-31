import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {UserRole} from "../../../../common/models/user/role/role";
import {UserService} from "../../../../common/services/user/user.service";

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  addPersonForm = new FormGroup({
    avatar: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    lastLoggedIn: new FormControl(new Date().toDateString()),
    profileViews: new FormControl(''),
    age: new FormControl(''),
    role: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    company: new FormControl(''),
    connections: new FormControl([]),
  });

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

  addPeople() {
    return this.userService.addUser({}).subscribe();
  }

  ngOnInit() {
    this.getAllConnections();
  }
}
