import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { decode } from '../../utils/decode';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName = '';
  role = '';
  isHomePage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pages = ['/login', '/register'];
        this.isHomePage = !pages.includes(event.url);
      }
    });

    const auth = sessionStorage.getItem('response-token');

    if (!auth) {
      throw new Error('Erro ao verificar token');
    }

    this.userName = JSON.parse(auth).name;
    this.role = decode().role;
  }

  get showRelease(): boolean {
    return this.role === 'ADMIN' && this.router.url === '/home';
  }

  get showBack(): boolean {
    return this.role === 'ADMIN' && this.router.url === '/';
  }

  get showRegister(): boolean {
    return this.role === 'ADMIN' && this.router.url === '/home';
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
