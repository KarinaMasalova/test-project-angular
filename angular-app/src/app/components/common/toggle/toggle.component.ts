import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from "../../../services/color-scheme/color-scheme.service";

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  lightMode = 'Light';
  darkMode = 'Dark';

  constructor(private colorSchemeService: ColorSchemeService) {}

  changeTheme(): void {
    this.colorSchemeService.toggleDarkMode();
  }

  isDarkMode() {
    return this.colorSchemeService.isDarkMode();
  }

  ngOnInit(): void {
  }
}
