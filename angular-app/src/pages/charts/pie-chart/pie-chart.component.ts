import {Component, OnInit} from '@angular/core';

import { UserService } from "../../../common/services/user/user.service";
import { roundNumber } from "../../../common/utils/roundNumber";
import * as colors from "../../../common/constants/colors";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit {
  public chartType: string = 'pie';
  private lawyersAmount: number = 0;
  private clientsAmount: number = 0;
  public chartLabels: Array<any> = ['Clients', 'Lawyers'];

  constructor(private userService: UserService) { }

  public chartDatasets: Array<any> = [
    { data: [this.clientsAmount, this.lawyersAmount], label: 'The ratio of clients and lawyers' }
  ];

  public chartColors: Array<any> = [{
    backgroundColor: [colors.orange, colors.yellow],
    hoverBackgroundColor: [colors.orangeHover, colors.yellowHover],
    borderWidth: 2,
  }];

  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  private setPeopleAmount() {
    this.userService.getUsers().subscribe(users => {
      this.lawyersAmount = roundNumber(
        users.filter(user => user.role === 'lawyer').length * 100 / users.length, 2
      );
      this.clientsAmount = roundNumber(
        users.filter(user => user.role === 'client').length * 100 / users.length, 2
      );
      this.chartDatasets = [
        { data: [this.clientsAmount, this.lawyersAmount], label: 'The ratio of clients and lawyers' }
      ];
    });
  }

  ngOnInit() {
    this.setPeopleAmount();
  }
}
