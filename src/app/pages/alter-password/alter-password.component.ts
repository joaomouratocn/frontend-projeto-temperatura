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
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session-service.service';
import { AuthService } from '../../services/auth/auth.service';

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
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private requestService: RequestService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    const currentPass = this.sessionService.get('pass');

    if (typeof currentPass === 'string') {
      this.alterPassForm.get('currentPass')?.setValue(currentPass);
    }
  }

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
      this.alterPassForm.controls.matchNewPass.touched &&
      this.alterPassForm.controls.matchNewPass.value !==
        this.alterPassForm.controls.newPass.value
    );
  }

  sendUpdate() {
    if (this.invalidFields()) {
      return;
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
            this.toastr.success(response.message);
            this.navigate();
          },
          error: (error) => {
            console.log(error);
            const message = error.error?.message;
            this.toastr.error(message);
          },
        });
    }
  }

  invalidFields(): boolean {
    let fieldsError: string[] = [];

    const { currentPass, newPass, matchNewPass } = this.alterPassForm.controls;

    if (currentPass.invalid) {
      fieldsError.push('Senha atual');
    }
    if (newPass.invalid) {
      fieldsError.push('Nova senha');
    }
    if (matchNewPass.value !== newPass.value) {
      fieldsError.push('Campo de senha não confere');
    }

    if (fieldsError.length === 0) {
      return false;
    }

    this.toastr.error(`Campos invalidos:\n ${fieldsError.join(', ')}`);
    return true;
  }

  navigate() {
    this.sessionService.remove('pass');
    const userRole = this.authService.decodeToken()?.role;
    if (userRole === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
