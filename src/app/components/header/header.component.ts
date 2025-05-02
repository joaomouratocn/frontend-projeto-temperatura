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

  ngOnInit() {
    this.updateText();

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.updateText();
      });
  }

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
      this.router.url === '/home'
    );
  }

  get shouldShowInsertButton(): boolean {
    const role = this.authService.decodeToken()?.role;
    return role === 'ADMIN';
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
    this.sessionService.clear();
    this.router.navigate(['/login']);
  }

  handleInsertClick() {
    const currentUrl = this.router.url;

    if (currentUrl === '/home') {
      this.optionInsert = true;
      this.router.navigate(['/select']);
    } else {
      this.optionInsert = false;
      this.router.navigate(['/home']);
    }

    this.updateText();
  }
  private updateText() {
    const currentUrl = this.router.url;

    if (currentUrl === '/home') {
      this.buttonText = 'Inserir dados';
    } else {
      this.buttonText = 'Voltar';
    }
  }
}
