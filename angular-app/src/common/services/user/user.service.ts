import { Injectable } from '@angular/core';

import { User } from "../../models/user/user";
import { HttpClientService } from "../http-client/http-client.service";
import {url} from "../../constants/api";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  users!: User[];

  constructor(private http: HttpClientService) { }

  getUsers() {
    return this.http.get<User>(url)
      .subscribe(users => this.users = users);
  }

  addUser(user: object) {
    return this.http.post<User>(url, user)
      .subscribe(newUser => user = newUser);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(url, id)
      .subscribe(() => {
        this.getUsers();
        return true;
      });
  }
}
