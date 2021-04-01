import { Injectable } from '@angular/core';

import { User } from "../../models/user/user";
import { HttpClientService } from "../http-client/http-client.service";
import {url} from "../../constants/api";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClientService) { }

  public getUsers() {
    return this.http.get<User>(url);
  }

  public addUser(user: any) {
    return this.http.post<User>(url, user);
  }

  public deleteUser(id: number) {
    return this.http.deleteById<User>(url, id);
  }
}
