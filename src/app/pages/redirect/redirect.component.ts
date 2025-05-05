import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session-service.service';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css',
})
export class RedirectComponent {
  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.clear();

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
