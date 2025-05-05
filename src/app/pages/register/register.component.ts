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
import { RequestService } from '../../services/requests/request.service';
import { ToastrService } from 'ngx-toastr';
import { UnitModelType } from '../../types/unit-model.type';
import { RegisterModelType } from '../../types/register-model.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  providers: [RequestService, ToastrService],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  unitArray: UnitModelType[] = [];

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  registerForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    username: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    unit: new FormControl<UnitModelType | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.getUnits();
  }

  getUnits() {
    this.requestService.getUnits().subscribe({
      next: (response) => {
        this.unitArray = response;
      },
      error: (erro) => {
        this.toastr.error('Erro de comunicação com o servidor.');
        console.error(erro);
      },
    });
  }

  register() {
    if (this.invalidFields()) {
      return;
    }

    const { name, username, unit } = this.registerForm.controls;

    if (
      typeof name.value === 'string' &&
      typeof username.value === 'string' &&
      typeof unit.value?.id === 'string'
    ) {
      const newUser: RegisterModelType = {
        name: name.value,
        username: username.value,
        unit: unit.value.id,
      };

      this.requestService.register(newUser).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.router.navigate(['/admin']);
        },
        error: (erro) => {
          this.toastr.error(erro.error?.message);
          console.log(erro);
        },
      });
    }
  }

  get nameInvalid(): boolean {
    return (
      this.registerForm.controls.name.invalid &&
      this.registerForm.controls.name.touched
    );
  }

  get usernameInvalid(): boolean {
    return (
      this.registerForm.controls.username.invalid &&
      this.registerForm.controls.username.touched
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

    const { name, username: username, unit } = this.registerForm.controls;

    if (name.invalid) {
      fieldsError.push('name');
    }
    if (username.invalid) {
      fieldsError.push('username');
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
