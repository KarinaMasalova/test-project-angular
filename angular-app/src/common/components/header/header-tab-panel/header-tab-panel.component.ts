import { Component } from '@angular/core';
import {Router, NavigationEnd, RouterEvent} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-tab-panel',
  templateUrl: './header-tab-panel.component.html',
  styleUrls: ['./header-tab-panel.component.scss'],
})
export class HeaderTabPanelComponent {
  private currentRoute!: string;
  public links = ['people', 'charts'];
  public activeLink = this.currentRoute === '/people'
    ? this.links[0]
    : this.links[1];

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof RouterEvent) {
        this.currentRoute = event.url;
      }
      this.activeLink = this.currentRoute === '/people'
        ? this.links[0]
        : this.links[1];
    });
  }
}
