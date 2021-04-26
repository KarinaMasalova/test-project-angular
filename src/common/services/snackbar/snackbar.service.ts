import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackbar: MatSnackBar) {}

  public showSnackbar(message: string, action: string, duration: number): void {
    this.snackbar.open(message, action, {
      duration,
      horizontalPosition: 'end',
      panelClass: ['error-snackbar'],
    });
  }
}
