import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  set(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  get<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clear(): void {
    sessionStorage.clear();
  }
}
