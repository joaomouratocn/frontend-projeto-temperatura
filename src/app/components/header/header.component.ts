import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName = sessionStorage.getItem('name');
  isHomePage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pages = ['/login'];
        this.isHomePage = !pages.includes(event.url);
      }
    });
  }

  get showRelease(): boolean {
    return (
      this.authService.decodeToken()?.role === 'ADMIN' &&
      this.router.url === '/home'
    );
  }

  get showBack(): boolean {
    return (
      this.authService.decodeToken()?.role === 'ADMIN' &&
      this.router.url === '/'
    );
  }

  get showRegister(): boolean {
    return (
      this.authService.decodeToken()?.role === 'ADMIN' &&
      this.router.url === '/home'
    );
  }

  goSelectUnit() {
    this.router.navigate(['select']);
  }

  goHomeAdm() {
    this.router.navigate(['home']);
  }

  goRegister() {
    sessionStorage.clear();
    this.router.navigate(['register']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
