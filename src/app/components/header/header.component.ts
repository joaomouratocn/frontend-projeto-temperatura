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

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pages = ['/login'];
        this.isHomePage = !pages.includes(event.url);
      }
    });
  }

  ngOnInit() {
    this.userName = this.sessionService.get('name') || '';
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
    this.router.navigate(['/select']);
  }

  goHomeAdm() {
    this.router.navigate(['/home']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    sessionStorage.clear();
  }
}
