import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private isDark = false;

  constructor(private renderFactory: RendererFactory2) {
    this.renderer = renderFactory.createRenderer(null, null);
    const savedTheme = localStorage.getItem('theme');
    this.isDark = savedTheme === 'dark';
    this.updateTheme();
  }

  togleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.updateTheme();
  }

  updateTheme(): void {
    const htmlEl = document.documentElement;
    if (this.isDark) {
      this.renderer.addClass(htmlEl, 'dark');
    } else {
      this.renderer.removeClass(htmlEl, 'dark');
    }
  }

  isDarkTheme(): boolean {
    return this.isDark;
  }
}
