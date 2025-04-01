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

@Component({
  selector: 'app-home',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  collectDataForm = new FormGroup({
    refMin: new FormControl(0, [Validators.required]),
    refCur: new FormControl(0, [Validators.required]),
    refMax: new FormControl(0, [Validators.required]),
    envMin: new FormControl(0, [Validators.required]),
    envCur: new FormControl(0, [Validators.required]),
    envMax: new FormControl(0, [Validators.required]),
  });

  passwordValid: boolean = true;

  send() {
    console.log('Enviar dados!');
  }
}
