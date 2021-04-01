import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import { MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from "@angular/material/sort";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { MDBBootstrapModule  } from "angular-bootstrap-md";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderTabPanelComponent } from '../common/components/header/header-tab-panel/header-tab-panel.component';
import { HeaderComponent } from '../common/components/header/header.component';
import { HeaderOptionsMenuComponent } from '../common/components/header/header-options-menu/header-options-menu.component';
import { ThemeToggleComponent } from '../common/components/header/theme-toggle/theme-toggle.component';
import { PeopleComponent } from '../pages/people/people.component';
import { ChartsComponent } from '../pages/charts/charts.component';
import { PeopleTableComponent } from '../pages/people/people-table/people-table.component';
import { PieChartComponent } from "../pages/charts/pie-chart/pie-chart.component";
import { BarChartComponent } from '../pages/charts/bar-chart/bar-chart.component';
import { AddPersonDialogComponent } from '../pages/people/add-person-dialog/add-person-dialog.component';
import { DialogContentComponent } from '../pages/people/add-person-dialog/dialog-content/dialog-content.component';
import { ErrorSnackbarComponent } from '../pages/people/add-person-dialog/error-snackbar/error-snackbar.component';
import { LoaderComponent } from '../common/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTabPanelComponent,
    HeaderComponent,
    HeaderOptionsMenuComponent,
    ThemeToggleComponent,
    PeopleComponent,
    ChartsComponent,
    PeopleTableComponent,
    PieChartComponent,
    BarChartComponent,
    AddPersonDialogComponent,
    DialogContentComponent,
    ErrorSnackbarComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MDBBootstrapModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AddPersonDialogComponent,
    DialogContentComponent,
    ErrorSnackbarComponent,
    MatSnackBar,
    LoaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
