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
  public lightMode = Themes.light;
  public darkMode = Themes.dark;

  constructor(private colorSchemeService: ColorSchemeService) {}

  public changeTheme(): void {
    this.colorSchemeService.toggleDarkMode();
  }

  public isDarkMode(): boolean {
    return this.colorSchemeService.isDarkMode();
  }

  ngOnInit(): void {
  }
}
