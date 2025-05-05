import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SessionService } from '../../services/session/session-service.service';

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
      this.authService.decodeToken()?.role === 'ADMIN' &&
      this.router.url.startsWith('/admin')
    );
  }

  get showAlterPassword(): boolean {
    const role = this.authService.decodeToken()?.role;
    if (role === 'USER' && this.router.url.startsWith('/home')) {
      return true;
    } else if (role === 'ADMIN' && this.router.url.startsWith('/admin')) {
      return true;
    }
    return false;
  }

  get showBackToHome(): boolean {
    const role = this.authService.decodeToken()?.role;
    if (role === 'USER' && !this.router.url.startsWith('/home')) {
      return true;
    } else if (role === 'ADMIN' && !this.router.url.startsWith('/admin')) {
      return true;
    }
    return false;
  }

  get shouldShowInsertButton(): boolean {
    return (
      this.authService.decodeToken()?.role === 'ADMIN' &&
      this.router.url.startsWith('/admin')
    );
  }

  goSelectUnitPage() {
    this.navigate('/select');
  }

  goHomePage() {
    const role = this.authService.decodeToken()?.role;
    if (role === 'ADMIN') {
      this.navigate('/admin');
    } else {
      this.navigate('home');
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
