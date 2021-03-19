import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ColorSchemeService {
  private renderer: Renderer2;
  private colorTheme: string = '';
  private isDarkTheme: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  isDarkMode() {
    return this.colorTheme === 'dark-theme';
  }

  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem('theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('theme')) {
      this.colorTheme = localStorage.getItem('theme') || '';
    } else {
      this.colorTheme = this.isDarkTheme
        ? 'dark-theme'
        : 'light-theme';
      localStorage.setItem('theme', this.colorTheme);
    }
  }

  update(theme: 'dark-theme' | 'light-theme') {
    this.setColorTheme(theme);
    const previousColorTheme = (theme === 'dark-theme') ? 'light-theme' : 'dark-theme';
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  toggleDarkMode() {
    this.isDarkTheme = this.isDarkMode();
    this.isDarkTheme
      ? this.update('light-theme')
      : this.update('dark-theme');
  }
}
