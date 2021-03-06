import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { UserService } from '../../../common/services/user/user.service';
import { roundNumber } from '../../../common/utils/roundNumber';
import * as colors from '../../../common/constants/colors';
import { UserRoles } from '../../../common/models/user/user';
import {
  ChartColors,
  ChartDatasets,
  ChartOptions,
} from '../../../common/models/chart/chart';
import { throwError } from 'rxjs';
import { SnackbarService } from '../../../common/services/snackbar/snackbar.service';

enum ChartLabels {
  clients = 'Clients',
  lawyers = 'Lawyers',
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './user-ratio-by-role.component.html',
  styleUrls: ['./user-ratio-by-role.component.scss'],
})
export class UserRatioByRoleComponent implements OnInit {
  public chartType = 'pie';
  public chartLabels: Array<string> = [
    ChartLabels.clients,
    ChartLabels.lawyers,
  ];
  public lawyersAmount = 0;
  public clientsAmount = 0;
  public chartDatasets: Array<ChartDatasets> = [
    {
      data: [this.clientsAmount, this.lawyersAmount],
      label: 'The ratio of clients and lawyers',
    },
  ];
  public chartColors: Array<ChartColors> = [
    {
      backgroundColor: [colors.orange, colors.yellow],
      borderColor: colors.orange,
      hoverBackgroundColor: [colors.orangeHover, colors.yellowHover],
      borderWidth: 2,
    },
  ];
  public chartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(
    private readonly userService: UserService,
    private readonly snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.setPeopleAmount();
  }

  private setPeopleAmount(): void {
    this.userService
      .getUsers()
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showSnackbar(
              'ERROR: No user information was received from the server.',
              'OK',
              5000
            );
          }
          return throwError(err.statusText);
        }),
        map((users) => {
          this.lawyersAmount = roundNumber(
            (users.filter((user) => user.role === UserRoles.lawyer).length *
              100) /
              users.length,
            2
          );
          this.clientsAmount = roundNumber(
            (users.filter((user) => user.role === UserRoles.client).length *
              100) /
              users.length,
            2
          );
          this.chartDatasets = [
            {
              data: [this.clientsAmount, this.lawyersAmount],
              label: 'The ratio of clients and lawyers',
            },
          ];
        })
      )
      .subscribe();
  }
}
