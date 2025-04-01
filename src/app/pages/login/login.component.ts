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
import { RequestService } from '../../services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginModelType } from '../../types/login-model.type';

@Component({
  selector: 'app-login',
  providers: [RequestService, ToastrService],
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login() {
    if (this.invalidFields()) {
      return;
    }

    const { email, password } = this.loginForm.controls;

    if (typeof email == 'string' && typeof password == 'string') {
      const loginModeType: LoginModelType = {
        email: email,
        password: password,
      };

      this.requestService.login(loginModeType).subscribe({
        next: (response) => {
          if ('token' in response) {
            this.toastr.success('Sucesso!');
            console.log(response);
            this.router.navigate(['']);
          } else {
            const errorMessage = response.description || 'Erro desconhecido!';
            this.toastr.error(errorMessage);
            console.log(response);
          }
        },
        error: (error) => {
          this.toastr.error('Falha na comunicação com o servidor!');
          console.error(error);
        },
      });
    }
  }

  register() {
    this.router.navigate(['register']);
  }

  get nameValid(): Boolean {
    return (
      this.loginForm.controls.email.invalid &&
      this.loginForm.controls.email.touched
    );
  }

  get passwordValid(): Boolean {
    return (
      this.loginForm.controls.password.invalid &&
      this.loginForm.controls.password.touched
    );
  }

  invalidFields(): boolean {
    let fieldsError: string[] = [];

    const { email, password } = this.loginForm.controls;

    if (email.invalid) {
      fieldsError.push('Email');
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
