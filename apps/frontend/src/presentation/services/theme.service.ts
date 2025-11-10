import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private current: 'light' | 'dark' = 'dark';

  init() {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    this.current = prefersDark ? 'dark' : 'light';
    this.apply();
  }

  toggle() {
    this.current = this.current === 'dark' ? 'light' : 'dark';
    this.apply();
  }

  private apply() {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(this.current === 'dark' ? 'theme-dark' : 'theme-light');
  }
}
