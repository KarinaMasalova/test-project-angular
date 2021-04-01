import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { DialogContentComponent } from "./dialog-content/dialog-content.component";

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent);
    dialogRef.afterClosed().subscribe();
  }

  ngOnInit(): void {
  }
}
