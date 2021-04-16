import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../common/services/user/user.service';
import * as colors from '../../../common/constants/colors';
import { BriefUserInfo, User } from '../../../common/models/user/user';
import {
  ChartColors,
  ChartDatasets,
  ChartOptions,
} from '../../../common/models/chart/chart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './users-distribution-by-country.html',
  styleUrls: ['./users-distribution-by-country.scss'],
})
export class UsersDistributionByCountryComponent implements OnInit {
  public chartType = 'horizontalBar';
  public chartLabels: Array<string> = [];
  public chartDatasets: Array<ChartDatasets> = [];
  public chartReady = false;
  public chartColors: ChartColors[] = [
    {
      backgroundColor: colors.turquoiseHover,
      hoverBackgroundColor: colors.turquoise,
      borderColor: colors.turquoise,
      borderWidth: 2,
    },
  ];
  public chartOptions: ChartOptions = {
    responsive: true,
  };

  private mapCollection: Map<string, BriefUserInfo[]> = new Map();
  private valuesArray: number[] = [0];
  private countryPeople: BriefUserInfo[] = [];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.setChartData();
  }

  private setMapCollection(users: User[]): void {
    users.map((user) => {
      this.countryPeople = this.mapCollection.get(user.country) || [];
      this.mapCollection.set(user.country, [
        ...this.countryPeople,
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      ]);
    });
  }

  private setChartData(): void {
    this.userService.getUsers().subscribe((users) => {
      this.setMapCollection(users);
      for (const [key, value] of this.mapCollection) {
        this.valuesArray = [...this.valuesArray, value.length];
        this.chartLabels = [...this.chartLabels, key];
      }
      this.chartDatasets = [
        { data: this.valuesArray, label: 'People from Different Countries' },
      ];
      this.chartReady = true;
    });
  }
}
