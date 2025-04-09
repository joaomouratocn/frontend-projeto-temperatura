import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-access-denied',
  imports: [ButtonComponent],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.css',
})
export class AccessDeniedComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['']);
  }
}
