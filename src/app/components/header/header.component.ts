import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName: string = sessionStorage.getItem('name') || '';
  role: string = sessionStorage.getItem('role') || '1';
  isHomePage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pages = ['/login', '/register'];
        this.isHomePage = !pages.includes(event.url);
      }
    });
  }

  get showRelease(): boolean {
    return this.role === '0' && this.router.url === '/home';
  }

  get showBack(): boolean {
    return this.role === '0' && this.router.url === '/';
  }

  goSelectUnit() {
    this.router.navigate(['select']);
  }

  goHomeAdm() {
    this.router.navigate(['home']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
