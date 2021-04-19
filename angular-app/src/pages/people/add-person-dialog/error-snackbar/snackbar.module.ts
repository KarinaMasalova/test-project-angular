import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorSnackbarComponent } from './error-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ErrorSnackbarComponent, MatSnackBar],
})
export class SnackbarModule {}
