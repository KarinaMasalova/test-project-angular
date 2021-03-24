import { Component } from '@angular/core';

import { ColorSchemeService } from "../common/services/color-scheme/color-scheme.service";
import { HttpClientService } from '../common/services/http-client/http-client.service';
import { User } from "../common/models/user/user";
import { url } from "../common/constants/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  users!: User[];
  constructor(private colorSchemeService: ColorSchemeService, private http: HttpClientService) {
    this.colorSchemeService.initTheme();
    console.log(http.get<User>(url).subscribe(users => {
      console.log(users);
      return this.users = users;
    }));
  }
}
