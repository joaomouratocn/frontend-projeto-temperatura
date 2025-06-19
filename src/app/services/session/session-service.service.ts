import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  set(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  get(key: string): any | null {
    return sessionStorage.getItem(key);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
