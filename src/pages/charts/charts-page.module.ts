import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRatioByRoleComponent } from './user-ratio-by-role/user-ratio-by-role.component';
import { UsersDistributionByCountryComponent } from './users-distribution-by-country/users-distribution-by-country';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [UserRatioByRoleComponent, UsersDistributionByCountryComponent],
  imports: [CommonModule, MDBBootstrapModule.forRoot()],
  exports: [UsersDistributionByCountryComponent, UserRatioByRoleComponent],
})
export class ChartsPageModule {}
