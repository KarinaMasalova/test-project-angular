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
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderTabPanelComponent } from '../common/components/header/header-tab-panel/header-tab-panel.component';
import { HeaderComponent } from '../common/components/header/header.component';
import { HeaderOptionsMenuComponent } from '../common/components/header/header-options-menu/header-options-menu.component';
import { ThemeToggleComponent } from '../common/components/header/theme-toggle/theme-toggle.component';
import { PeopleComponent } from '../pages/people/people.component';
import { ChartsComponent } from '../pages/charts/charts.component';
import { PeopleTableComponent } from '../pages/people/people-table/people-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTabPanelComponent,
    HeaderComponent,
    HeaderOptionsMenuComponent,
    ThemeToggleComponent,
    PeopleComponent,
    ChartsComponent,
    PeopleTableComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
