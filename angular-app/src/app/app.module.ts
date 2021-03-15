import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import { MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderTabPanelComponent } from './components/header-tab-panel/header-tab-panel.component';
import { HeaderComponent } from './containers/header/header.component';
import { HeaderOptionsMenuComponent } from './components/header-options-menu/header-options-menu.component';
import { ToggleComponent } from './components/common/toggle/toggle.component';
import { PeopleOverviewComponent } from './containers/people-overview/people-overview.component';
import { ChartsOverviewComponent } from './containers/charts-overview/charts-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTabPanelComponent,
    HeaderComponent,
    HeaderOptionsMenuComponent,
    ToggleComponent,
    PeopleOverviewComponent,
    ChartsOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
