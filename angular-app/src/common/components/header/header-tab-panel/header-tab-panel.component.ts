import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

enum Tabs {
  people = 'people',
  charts = 'charts',
}

@Component({
  selector: 'app-header-tab-panel',
  templateUrl: './header-tab-panel.component.html',
  styleUrls: ['./header-tab-panel.component.scss'],
})
export class HeaderTabPanelComponent {
  public tabs = Tabs;
  public activeLink: string | undefined;
  private currentRoute: string | undefined;

  constructor(private readonly router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof RouterEvent) {
        this.currentRoute = event.url;
        this.activeLink =
          this.currentRoute === '/people' ? this.tabs.people : this.tabs.charts;
      }
    });
  }
}
