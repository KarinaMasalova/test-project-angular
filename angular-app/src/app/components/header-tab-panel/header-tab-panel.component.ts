import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-tab-panel',
  templateUrl: './header-tab-panel.component.html',
  styleUrls: ['./header-tab-panel.component.scss']
})
export class HeaderTabPanelComponent implements OnInit {
  peopleTab = 'People';
  chartsTab = 'Charts';

  constructor() { }

  ngOnInit(): void {
  }
}
