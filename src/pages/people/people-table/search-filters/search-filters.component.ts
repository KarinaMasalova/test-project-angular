import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { PeopleStore } from '../people.store';
import { UserService } from '../../../../common/services/user/user.service';
import { initialFilters } from '../../../../common/models/user/filters';
import { UserRoles } from '../../../../common/models/user/user';

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
    private readonly userService: UserService
  ) {
    console.log(this.filters);
  }

  public onSearchButtonClick(): void {
    this.userService
      .getUsersByFilters(this.filters)
      .pipe(
        tap((users) => {
          this.peopleStore.setState((state) => ({
            ...state,
            users,
          }));
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
    this.userService.getUsers().subscribe((users) => {
      this.peopleStore.setState((state) => ({
        ...state,
        users,
      }));
    });
  }
}
