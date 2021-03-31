import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserRole} from "../../../../common/models/user/role/role";
import {UserService} from "../../../../common/services/user/user.service";

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  addPersonForm = new FormGroup({
    avatar: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    lastLoggedIn: new FormControl(new Date('July 29, 2020 03:24:00').toDateString(), Validators.required),
    profileViews: new FormControl(67, Validators.required),
    age: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
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
    if (!this.addPersonForm.valid) {
      return;
    }
    return this.userService.addUser(this.addPersonForm.value).subscribe();
  }

  ngOnInit() {
    this.getAllConnections();
  }
}
