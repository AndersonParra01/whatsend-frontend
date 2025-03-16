import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() { }

  setItem(key: string, value: any | null): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string) {
    const item = localStorage.getItem(key);
    // Si no existe, retorna null
    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      // Si no es JSON válido, simplemente regresamos el `item`.
      return item;
    }
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
}
