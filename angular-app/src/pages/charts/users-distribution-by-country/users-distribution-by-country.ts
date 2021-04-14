import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../common/services/user/user.service';
import * as colors from '../../../common/constants/colors';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './users-distribution-by-country.html',
  styleUrls: ['./users-distribution-by-country.scss'],
})
export class UsersDistributionByCountryComponent implements OnInit {
  public chartType = 'horizontalBar';
  public chartLabels: Array<any> = [''];
  public chartDatasets: Array<any> = [];
  public chartReady = false;
  public chartColors: Array<any> = [{
    backgroundColor: colors.turquoiseHover,
    borderColor: colors.turquoise,
    borderWidth: 2,
  }];
  public chartOptions: any = {
    responsive: true
  };

  private mapCollection: Map<string, object[]> = new Map();
  private valuesArray: any[] = [0];
  private countryPeople: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.setChartData();
  }

  private setMapCollection(users: any[]): void {
    users.map(user => {
      this.countryPeople = this.mapCollection.get(user.country) || [];
      this.mapCollection.set(user.country, [...this.countryPeople, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      }]);
    });
  }

  private setChartData(): void {
    this.userService.getUsers().subscribe(users => {
      this.setMapCollection(users);
      for (const [key, value] of this.mapCollection) {
        this.valuesArray = [...this.valuesArray, value.length];
        this.chartLabels = [...this.chartLabels, key];
      }
      this.chartDatasets = [
        { data: this.valuesArray, label: 'People from Different Countries' }
      ];
      this.chartReady = true;
    });
  }
}
