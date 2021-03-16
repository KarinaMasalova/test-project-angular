import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ColorSchemeService {
  private renderer: Renderer2;
  private colorScheme: string = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setColorScheme(scheme: string) {
    this.colorScheme = scheme;
    localStorage.setItem('prefers-color', scheme);
  }

  getColorScheme() {
    if (localStorage.getItem('prefers-color')) {
      this.colorScheme = JSON.parse(localStorage.getItem('prefers-color') || '{}');
    }
  }

  load() {
    this.getColorScheme();
    this.renderer.addClass(document.body, `${this.colorScheme}-theme`);
  }

  update(scheme: string) {
    this.setColorScheme(scheme);
    this.renderer.removeClass( document.body, `${(this.colorScheme === 'dark' ? 'light' : 'dark')}-theme`);
    this.renderer.addClass(document.body, `${scheme}-theme`);
  }
}
