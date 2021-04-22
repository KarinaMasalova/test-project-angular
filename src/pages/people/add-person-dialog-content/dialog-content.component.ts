import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from '../../../common/services/user/user.service';
import { User, UserRoles } from '../../../common/models/user/user';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
  public connectionsList: User[] = [];
  public addPersonForm: FormGroup;

  public roles = Object.values(UserRoles).filter(
    (i) => !(typeof i === 'number')
  );
  private durationInSeconds = 5;

  constructor(
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar
  ) {
    this.addPersonForm = DialogContentComponent.initFormGroup();
  }

  public showSnackbar(): void {
    this.snackBar.open(
      "ERROR: the user wasn't added. Please, make sure that " +
        'all the fields are filled in.',
      'OK',
      {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'end',
        panelClass: ['error-snackbar'],
      }
    );
  }

  public addPeople(): Subscription | undefined {
    if (!this.addPersonForm.valid) {
      this.showSnackbar();
      return;
    }
    return this.userService.addUser(this.addPersonForm.value).subscribe();
  }

  ngOnInit(): void {
    this.getAllConnections();
  }

  private getAllConnections(): Subscription {
    return this.userService
      .getUsers()
      .pipe(tap((users) => (this.connectionsList = users)))
      .subscribe();
  }

  private static initFormGroup(): FormGroup {
    return new FormGroup({
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
  }
}
