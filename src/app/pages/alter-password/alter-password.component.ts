import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { ButtonComponent } from '../../components/button/button.component';
import { RequestService } from '../../services/requests/request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alter-password',
  providers: [RequestService, ToastrService],
  imports: [ReactiveFormsModule, InputPasswordComponent, ButtonComponent],
  templateUrl: './alter-password.component.html',
  styleUrl: './alter-password.component.css',
})
export class AlterPasswordComponent {
  alterPassForm = new FormGroup({
    currentPass: new FormControl('', [
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

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService
  ) {}

  get currentShowError(): boolean {
    return (
      this.alterPassForm.controls.currentPass.invalid &&
      this.alterPassForm.controls.currentPass.touched
    );
  }

  get newShowError(): boolean {
    return (
      this.alterPassForm.controls.newPass.invalid &&
      this.alterPassForm.controls.newPass.touched
    );
  }

  get confirmShowError(): boolean {
    return (
      this.alterPassForm.controls.matchNewPass.invalid &&
      this.alterPassForm.controls.matchNewPass.touched
    );
  }

  sendUpdate() {
    if (
      this.alterPassForm.controls.currentPass.invalid ||
      this.alterPassForm.controls.newPass.invalid ||
      this.alterPassForm.controls.newPass !=
        this.alterPassForm.controls.matchNewPass
    ) {
    }

    const { currentPass, newPass } = this.alterPassForm.controls;

    if (
      typeof newPass.value === 'string' &&
      typeof currentPass.value === 'string'
    ) {
      this.requestService
        .updatePassword(currentPass.value, newPass.value)
        .subscribe({
          next: (response) => {
            console.log('sucesso!');
            this.toastr.success(response);
          },
          error: (error) => {
            this.toastr.error(error.erro?.message);
          },
        });
    }
  }
}
