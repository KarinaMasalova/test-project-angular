import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UserService } from '../../../common/services/user/user.service';
import { User, UserRoles } from '../../../common/models/user/user';
import { SnackbarService } from '../../../common/services/snackbar/snackbar.service';

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

  constructor(
    private readonly userService: UserService,
    private readonly snackbar: SnackbarService
  ) {
    this.addPersonForm = DialogContentComponent.initFormGroup();
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

  public addPeople(): Subscription | undefined {
    if (!this.addPersonForm.valid) {
      this.snackbar.showSnackbar(
        "ERROR: the user wasn't added. Please, make sure that " +
          'all the fields are filled in.',
        'OK',
        5000
      );
      return;
    }
    return this.userService
      .addUser(this.addPersonForm.value)
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showSnackbar(
              "ERROR: The user wasn't added.",
              'OK',
              5000
            );
          }
          return throwError(err.statusText);
        })
      )
      .subscribe();
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
}
