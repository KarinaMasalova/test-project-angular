import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user/user';
import { HttpClientService } from '../http-client/http-client.service';
import { url } from '../../constants/api';
import { Filters } from '../../models/user/filters';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClientService) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User>(url);
  }

  public getUsersByFilters(filters: Filters): Observable<User[]> {
    const urlPath = this.checkForFilters(filters);
    return this.http.get<User>(urlPath);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(url, user);
  }

  public deleteUser(id: number): Observable<User> {
    return this.http.deleteById<User>(url, id);
  }

  private checkForFilters(filters: Filters) {
    let fullUrl = `${url}?`;
    const filledFields = Object.entries(filters);
    filledFields.map((field) => {
      const [fieldName, value] = field;
      if (value) {
        filters = {
          ...filters,
          [fieldName]: value,
        };
        fullUrl += `${fieldName}=${value}`;
      } else {
        // @ts-ignore
        delete filters[fieldName];
      }
    });
    return fullUrl.slice(0, -1);
  }
}
