import { Component } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { PeopleStore } from '../people.store';
import { UserService } from '../../../../common/services/user/user.service';
import { initialFilters } from '../../../../common/models/user/filters';
import { UserRoles } from '../../../../common/models/user/user';
import { SnackbarService } from '../../../../common/services/snackbar/snackbar.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
})
export class SearchFiltersComponent {
  public filters = initialFilters;
  public roles = Object.values(UserRoles).filter(
    (i) => !(typeof i === 'number')
  );

  constructor(
    private readonly peopleStore: PeopleStore,
    private readonly userService: UserService,
    private readonly snackbar: SnackbarService
  ) {}

  public onSearchButtonClick(): void {
    this.userService
      .getUsersByFilters(this.filters)
      .pipe(
        map((users) => {
          this.peopleStore.setState((state) => ({
            ...state,
            users,
          }));
        }),
        catchError((err) => {
          if (err) {
            this.snackbar.showSnackbar(
              'ERROR: No user information was received according to search filters.',
              'OK',
              5000
            );
          }
          return throwError(err.statusText);
        })
      )
      .subscribe();
  }

  public resetFilters(): void {
    this.filters = {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      age: '',
      role: '',
    };
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
        })
      )
      .subscribe((users) => {
        this.peopleStore.setState((state) => ({
          ...state,
          users,
        }));
      });
  }
}
