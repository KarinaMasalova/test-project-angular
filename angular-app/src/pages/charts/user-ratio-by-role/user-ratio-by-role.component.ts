import {Component, OnInit} from '@angular/core';

import { UserService } from '../../../common/services/user/user.service';
import { roundNumber } from '../../../common/utils/roundNumber';
import * as colors from '../../../common/constants/colors';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './user-ratio-by-role.component.html',
  styleUrls: ['./user-ratio-by-role.component.scss'],
})

export class UserRatioByRoleComponent implements OnInit {
  public chartType = 'pie';
  public chartLabels: Array<any> = ['Clients', 'Lawyers'];
  public lawyersAmount = 0;
  public clientsAmount = 0;
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setPeopleAmount();
  }

  private setPeopleAmount(): void {
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
}
