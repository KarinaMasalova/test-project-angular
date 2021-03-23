import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-tab-panel',
  templateUrl: './header-tab-panel.component.html',
  styleUrls: ['./header-tab-panel.component.scss']
})
export class HeaderTabPanelComponent implements OnInit {
  links = ['people', 'charts'];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }
}
