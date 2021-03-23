import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from "../../../services/color-scheme/color-scheme.service";

enum Themes {
  light = 'Light',
  dark = 'Dark'
}

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})

export class ThemeToggleComponent implements OnInit {
  lightMode = Themes.light;
  darkMode = Themes.dark;

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
