import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SessionService } from '../../services/session/session-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName: string = '';
  isHomePage: boolean = false;
  optionInsert: boolean = false;
  buttonText: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pages = ['/login'];
        this.isHomePage = !pages.includes(event.url);
        this.userName = sessionService.get('name') || '';
      }
    });
  }

  get showRegister(): boolean {
    return (
      this.authService.decodeToken()?.role == 'ADMIN' &&
      this.router.url.startsWith('/register')
    );
  }

  get showAlterPassword(): boolean {
    return this.router.url !== '/alterpass';
  }

  get showBackToHome(): boolean {
    return (
      !this.router.url.startsWith('') || !this.router.url.startsWith('/home')
    );
  }

  get shouldShowInsertButton(): boolean {
    return this.authService.decodeToken()?.role === 'ADMIN';
  }

  goSelectUnitPage() {
    this.navigate('/select');
  }

  goHomePage() {
    const role = this.authService.decodeToken()?.role;
    if (role === 'ADMIN') {
      this.navigate('/home');
    } else {
      this.navigate('');
    }
  }

  goRegisterPage() {
    this.navigate('/register');
  }

  goAlterPasswordPage() {
    this.navigate('/alterpass');
  }

  logout() {
    this.sessionService.clear();
    this.navigate('/login');
  }

  private navigate(dest: string) {
    this.router.navigate([dest]);
  }
}
