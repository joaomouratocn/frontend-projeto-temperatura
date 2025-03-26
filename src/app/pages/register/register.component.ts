import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from "../../components/select/select.component";
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  itens = ['Item 1', 'Item 2', 'Item 3'];

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    unit: new FormControl('', {nonNullable:true, validators:[Validators.required]})
  });

  get nameInvalid(): boolean {
    return this.registerForm.controls.name.invalid && this.registerForm.controls.name.touched;
  }
  
  get emailInvalid(): boolean {
    return this.registerForm.controls.email.invalid && this.registerForm.controls.email.touched;
  }
  
  get passwordInvalid(): boolean {
    return this.registerForm.controls.password.invalid && this.registerForm.controls.password.touched;
  }

  get matchPassword(): boolean {
    return this.registerForm.controls.rePassword.value !== this.registerForm.controls.password.value &&
           this.registerForm.controls.rePassword.touched;
  }

  get unitInvalid(): boolean {
    return (this.registerForm.get('unit')?.invalid ?? false) && (this.registerForm.get('unit')?.touched ?? false);
  }
  
}
