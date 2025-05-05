import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-alter-password',
  imports: [ReactiveFormsModule, InputPasswordComponent, ButtonComponent],
  templateUrl: './alter-password.component.html',
  styleUrl: './alter-password.component.css',
})
export class AlterPasswordComponent {
  alterPassForm = new FormGroup({
    currentyPass: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPass: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    matchNewPass: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get showError(): boolean {
    return this.alterPassForm.controls.currentyPass.invalid;
  }

  sendUpdate() {
    //TODO
  }
}
