import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent {
  durationInSeconds: number = 5;

  constructor(private snackBar: MatSnackBar) {}

  open() {
    this.snackBar.open('ERROR: the user wasn\'t added. Please, make sure that ' +
      'all the fields are filled in.', 'OK', {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'end',
        panelClass: 'snackbar-container'
    });
  }
}
