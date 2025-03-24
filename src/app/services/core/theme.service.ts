import {
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId!: Object;
  private renderer: Renderer2;
  private isDark = false;
  private colorTheme: string = 'system';

  constructor(
    public renderFactory: RendererFactory2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    this.renderer = renderFactory.createRenderer(null, null);
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') || 'system';
      this.applyTheme();
    }
  }

  setTheme(theme: 'dark' | 'light' | 'system') {
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
    this.colorTheme = theme;
    this.applyTheme();
  }

  private applyTheme() {
    const htmlEl = document.documentElement;

    const theme =
      this.colorTheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : this.colorTheme;

    if (theme === 'dark') {
      this.renderer.addClass(htmlEl, 'dark');
    } else {
      this.renderer.removeClass(htmlEl, 'dark');
    }
  }

  get currentTheme(): string {
    return this.colorTheme;
  }
}
