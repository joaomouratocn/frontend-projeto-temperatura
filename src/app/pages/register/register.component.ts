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
    return !!this.registerForm.get('name')?.invalid && !!this.registerForm.get('name')?.touched;
  }
  
  get emailInvalid(): boolean {
    return !!this.registerForm.get('email')?.invalid && !!this.registerForm.get('email')?.touched;
  }
  
  get passwordInvalid(): boolean {
    return !!this.registerForm.get('password')?.invalid && !!this.registerForm.get('password')?.touched;
  }

  get matchPassword(): boolean {
    return (this.registerForm.get('password')?.value !== this.registerForm.get('rePassword')?.value) &&
           (this.registerForm.get('rePassword')?.touched ?? false);
  }

  get unitInvalid(): boolean {
    return (this.registerForm.get('unit')?.invalid ?? false) && (this.registerForm.get('unit')?.touched ?? false);
  }
  
}
