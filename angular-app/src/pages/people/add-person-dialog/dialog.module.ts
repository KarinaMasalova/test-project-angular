import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { AddPersonDialogComponent } from './add-person-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogContentComponent, AddPersonDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AddPersonDialogComponent, DialogContentComponent],
})
export class DialogModule {}
