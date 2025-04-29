import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodeToken } from '../../types/docode-token.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  decodeToken(): DecodeToken | null {
    const token = this.getToken();

    if (!token) return null;

    try {
      return jwtDecode<DecodeToken>(token);
    } catch (error) {
      console.error('Erro ao decodificar token!');
      return null;
    }
  }

  isTokenInvalidOrExpired(): boolean {
    const decodedToken = this.decodeToken();

    if (!decodedToken || decodedToken.exp) return true;

    const expiredDate = decodedToken.exp * 1000;
    return Date.now() > expiredDate;
  }

  validateSession() {
    console.log('validation');
    if (this.isTokenInvalidOrExpired()) {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
