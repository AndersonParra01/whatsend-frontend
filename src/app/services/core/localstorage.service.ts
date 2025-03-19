import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private platformId!: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }

  setItem(key: string, value: any): void {
    try {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log('Error saving local storage: ', error);
    }
  }

  getItem<T>(key: string): T | null {
    // Primero, asegúrate de que se está ejecutando en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const item = localStorage.getItem(key);

    if (item === null) {
      return null;
    }

    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error parseando el valor de localStorage:', error);
      return null;
    }
  }


  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

}
