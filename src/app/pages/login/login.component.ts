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
import { InputPasswordComponent } from '../../components/input-password/input-password.component';

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

    if (typeof email.value === 'string' && typeof password.value === 'string') {
      const loginModeType: LoginModelType = {
        email: email.value,
        password: password.value,
      };

      sessionStorage.setItem('name', 'João Mourato');
      sessionStorage.setItem('token', 'token123');
      sessionStorage.setItem('unit', 'Água vermelha');
      sessionStorage.setItem('unitId', '123abc');
      sessionStorage.setItem('role', '0');

      if (sessionStorage.getItem('role') === '0') {
        this.router.navigate(['home']);
        return;
      }
      this.router.navigate(['']);
    }
  }

  register() {
    this.router.navigate(['register']);
  }

  get emailValid(): boolean {
    return (
      this.loginForm.controls.email.invalid &&
      this.loginForm.controls.email.touched
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
