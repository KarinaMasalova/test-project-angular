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

  private getColorTheme(): string {
    return this.colorTheme;
  }

  private setColorTheme(theme: string): void {
    this.colorTheme = theme;
    localStorage.setItem('theme', theme);
  }

  public isDarkMode(): boolean {
    return this.colorTheme === 'dark-theme';
  }

  public initTheme(): void {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  public updateTheme(theme: 'dark-theme' | 'light-theme'): void {
    this.setColorTheme(theme);
    const previousColorTheme = (theme === 'dark-theme') ? 'light-theme' : 'dark-theme';
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  public toggleDarkMode(): void {
    this.colorTheme === 'dark-theme'
      ? this.updateTheme('light-theme')
      : this.updateTheme('dark-theme');
  }
}
