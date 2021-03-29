import { Component, OnInit } from '@angular/core';

import { UserService } from "../../../common/services/user/user.service";
import * as colors from "../../../common/constants/colors";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public chartType: string = 'horizontalBar';
  private mapCollection: Map<string, object[]> = new Map();
  public chartDatasets: Array<any> = [];
  private valuesArray: any[] = [0];
  private countryPeople: any[] = [];
  public chartLabels: Array<any> = [''];

  public chartColors: Array<any> = [{
    backgroundColor: colors.turquoiseHover,
    borderColor: colors.turquoise,
    borderWidth: 2,
  }];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private userService: UserService) { }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  private setMapCollection(users: any[]) {
    users.map(user => {
      this.countryPeople = this.mapCollection.get(user.country) || [];
      this.mapCollection.set(user.country, [...this.countryPeople, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      }]);
    });
  }

  private setChartData() {
    this.userService.getUsers().subscribe(users => {
      this.setMapCollection(users);
      for (const [key, value] of this.mapCollection) {
        this.valuesArray = [...this.valuesArray, value.length];
        this.chartLabels = [...this.chartLabels, key];
      }
      this.chartDatasets = [
        { data: this.valuesArray, label: 'People from Different Countries' }
      ];
    });
  }

  ngOnInit(): void {
    this.setChartData();
  }
}
