import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/requests/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginModelType } from '../../types/login-model.type';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { AuthService } from '../../services/auth/auth.service';
import { SessionService } from '../../services/session/session-service.service';

@Component({
  selector: 'app-login',
  providers: [RequestService, ToastrService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    InputPasswordComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private requestService: RequestService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login() {
    if (this.invalidFields()) {
      return;
    }

    const { username, password } = this.loginForm.controls;

    if (
      typeof username.value == 'string' &&
      typeof password.value == 'string'
    ) {
      const loginModeType: LoginModelType = {
        username: username.value,
        password: password.value,
      };

      this.requestService.login(loginModeType).subscribe({
        next: (response) => {
          if (response.mustChange) {
            this.router.navigate(['alterpass']);
            this.sessionService.set('pwd', password.value);
          } else {
            const userRole = this.authService.decodeToken()?.role;
            if (userRole === 'ADMIN') {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['home']);
            }
          }
        },
        error: (error) => {
          const message = error.error?.message;
          this.toastr.error(message);
        },
      });
    }
  }

  get usernameInvalid(): boolean {
    return (
      this.loginForm.controls.username.invalid &&
      this.loginForm.controls.username.touched
    );
  }

  get passwordValid(): boolean {
    return (
      this.loginForm.controls.password.invalid &&
      this.loginForm.controls.password.touched
    );
  }

  invalidFields(): boolean {
    let fieldsError: string[] = [];

    const { username, password } = this.loginForm.controls;

    if (username.invalid) {
      fieldsError.push('Nome de usuário');
    }
    if (password.invalid) {
      fieldsError.push('Senha');
    }

    if (fieldsError.length === 0) {
      return false;
    }

    this.toastr.error(`Campos invalidos:\n ${fieldsError.join(', ')}`);
    return true;
  }
}
