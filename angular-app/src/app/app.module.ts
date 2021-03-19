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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderTabPanelComponent } from './components/header-tab-panel/header-tab-panel.component';
import { HeaderComponent } from './containers/header/header.component';
import { HeaderOptionsMenuComponent } from './components/header-options-menu/header-options-menu.component';
import { ToggleComponent } from './components/common/toggle/toggle.component';
import { PeopleOverviewComponent } from './containers/people-overview/people-overview.component';
import { ChartsOverviewComponent } from './containers/charts-overview/charts-overview.component';
import { PeopleTableComponent } from './components/people-table/people-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTabPanelComponent,
    HeaderComponent,
    HeaderOptionsMenuComponent,
    ToggleComponent,
    PeopleOverviewComponent,
    ChartsOverviewComponent,
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
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
