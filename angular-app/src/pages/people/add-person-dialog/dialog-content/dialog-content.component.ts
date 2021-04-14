import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserRole} from '../../../../common/models/user/role/role';
import {UserService} from '../../../../common/services/user/user.service';
import {ErrorSnackbarComponent} from '../error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
  public connectionsList: Array<any> = [];

  public addPersonForm = new FormGroup({
    avatar: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    lastLoggedIn: new FormControl(new Date().toDateString()),
    profileViews: new FormControl(11),
    age: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    connections: new FormControl([]),
  });

  public roles: UserRole[] = [
    {value: 'lawyer'},
    {value: 'client'},
  ];

  constructor(private userService: UserService, private snackbar: ErrorSnackbarComponent) { }

  private getAllConnections() {
    return this.userService.getUsers()
      .subscribe((users) => this.connectionsList = users);
  }

  public addPeople() {
    if (!this.addPersonForm.valid) {
      this.snackbar.open();
      return;
    }
    return this.userService.addUser(this.addPersonForm.value).subscribe();
  }

  ngOnInit(): void {
    this.getAllConnections();
  }
}
