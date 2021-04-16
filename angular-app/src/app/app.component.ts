import { Component } from '@angular/core';

import { ColorSchemeService } from '../common/services/color-scheme/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly colorSchemeService: ColorSchemeService) {
    this.colorSchemeService.initTheme();
  }
}
