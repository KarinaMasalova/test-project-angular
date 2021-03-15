import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleOverviewComponent } from "./containers/people-overview/people-overview.component";
import { ChartsOverviewComponent } from "./containers/charts-overview/charts-overview.component";

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PeopleOverviewComponent },
  { path: 'charts', component: ChartsOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
