import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

import { User } from '../../../common/models/user/user';

export interface UsersState {
  users: User[];
}

@Injectable()
export class PeopleStore extends ComponentStore<UsersState> {
  public readonly users$: Observable<User[]> = this.select(state => state.users);

  constructor() {
    super({users: []});
  }
}
