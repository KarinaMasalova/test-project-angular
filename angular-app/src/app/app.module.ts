import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderTabPanelComponent } from '../common/components/header/header-tab-panel/header-tab-panel.component';
import { HeaderComponent } from '../common/components/header/header.component';
import { HeaderOptionsMenuComponent } from '../common/components/header/header-options-menu/header-options-menu.component';
import { ThemeToggleComponent } from '../common/components/header/theme-toggle/theme-toggle.component';
import { PeopleComponent } from '../pages/people/people.component';
import { ChartsComponent } from '../pages/charts/charts.component';
import { PeoplePageModule } from '../pages/people/people-page.module';
import { ChartsPageModule } from '../pages/charts/charts-page.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTabPanelComponent,
    HeaderComponent,
    HeaderOptionsMenuComponent,
    ThemeToggleComponent,
    PeopleComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatSlideToggleModule,
    PeoplePageModule,
    ChartsPageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
