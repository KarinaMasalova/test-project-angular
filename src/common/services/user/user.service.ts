import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user/user';
import { HttpClientService } from '../http-client/http-client.service';
import { url } from '../../constants/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClientService) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User>(url);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(url, user);
  }

  public deleteUser(id: number): Observable<User> {
    return this.http.deleteById<User>(url, id);
  }
}
