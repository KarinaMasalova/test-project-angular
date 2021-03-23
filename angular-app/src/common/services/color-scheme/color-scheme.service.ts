import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ColorSchemeService {
  private renderer: Renderer2;
  private colorTheme: string = '';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.colorTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark-theme'
        : 'light-theme');
  }

  private getColorTheme() {
    return this.colorTheme;
  }

  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem('theme', theme);
  }

  isDarkMode(): boolean {
    return this.colorTheme === 'dark-theme';
  }

  initTheme(): void {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  updateTheme(theme: 'dark-theme' | 'light-theme'): void {
    this.setColorTheme(theme);
    const previousColorTheme = (theme === 'dark-theme') ? 'light-theme' : 'dark-theme';
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  toggleDarkMode(): void {
    this.colorTheme === 'dark-theme'
      ? this.updateTheme('light-theme')
      : this.updateTheme('dark-theme');
  }
}
