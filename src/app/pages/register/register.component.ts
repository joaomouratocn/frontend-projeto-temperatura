import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from '../../components/select/select.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { ToastrService } from 'ngx-toastr';
import { UnitModelType } from '../../types/unit-model.type';
import { RegisterModelType } from '../../types/register-model.type';
import { Router } from '@angular/router';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';

@Component({
  selector: 'app-register',
  providers: [RequestService, ToastrService],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    InputPasswordComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  unitArray: UnitModelType[] = [
    { id: '1', name: 'Água vermelha' },
    { id: '2', name: 'Vila Isabel' },
    { id: '3', name: 'Santa Felicia' },
    { id: '4', name: 'São José' },
  ];

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    unit: new FormControl('', [Validators.required]),
  });

  register() {
    if (this.invalidFields()) {
      return;
    }

    const { name, email, password, unit } = this.registerForm.controls;

    console.log(typeof name.value);

    if (
      typeof name.value === 'string' &&
      typeof email.value === 'string' &&
      typeof password.value === 'string' &&
      typeof unit.value === 'string'
    ) {
      const newUser: RegisterModelType = {
        name: name.value,
        email: email.value,
        password: password.value,
        unit: unit.value,
      };

      console.log('Enviar Dados!');

      this.requestService.register(newUser).subscribe({
        next: (response) => {
          if ('email' in response) {
            this.toastr.success('Cadastro realizado com sucesso!');
            console.log(response);
            this.router.navigate(['login']);
          } else {
            const errorMessage = response.description || 'Erro desconhecido!';
            this.toastr.error(errorMessage);
            console.log(response);
          }
        },
        error: (erro) => {},
      });
    }
  }

  get nameInvalid(): boolean {
    return (
      this.registerForm.controls.name.invalid &&
      this.registerForm.controls.name.touched
    );
  }

  get emailInvalid(): boolean {
    return (
      this.registerForm.controls.email.invalid &&
      this.registerForm.controls.email.touched
    );
  }

  get passwordInvalid(): boolean {
    return (
      this.registerForm.controls.password.invalid &&
      this.registerForm.controls.password.touched
    );
  }

  get matchPassword(): boolean {
    return (
      this.registerForm.controls.rePassword.value !==
        this.registerForm.controls.password?.value &&
      this.registerForm.controls.rePassword.touched
    );
  }

  get unitInvalid(): boolean {
    return (
      this.registerForm.controls.unit.invalid &&
      this.registerForm.controls.unit.touched
    );
  }

  invalidFields(): boolean {
    let fieldsError: string[] = [];

    const { name, email, password, unit } = this.registerForm.controls;

    if (name.invalid) {
      fieldsError.push('name');
    }
    if (email.invalid) {
      fieldsError.push('email');
    }
    if (password.invalid) {
      fieldsError.push('senha');
    }
    if (unit.invalid) {
      fieldsError.push('unidade');
    }

    if (fieldsError.length === 0) {
      return false;
    }

    this.toastr.error(`Campos inválidos:\n ${fieldsError.join(', ')}`);
    return true;
  }
}
