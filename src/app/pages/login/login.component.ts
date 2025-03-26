import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [AuthService, ToastrService],
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService, 
    private toastr: ToastrService,
    private router: Router
  ){}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  login(){
    console.log(this.loginForm.value)
    console.log(this.loginForm.valid)

    if(!this.loginForm.valid){
      console.log("Falha")
      return
    }

    const {email, password} = this.loginForm.value

    if(typeof email === 'string' && typeof password === 'string'){
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.toastr.success("Sucesso!")
          console.log(response)
          this.router.navigate([''])

        },
        error: (error) => {
          this.toastr.error('Error!')
          console.log(error)
        }
      })
    }
  }

  get nameValid():Boolean{
    return this.loginForm.controls.email.invalid && this.loginForm.controls.email.touched
  }

  get passwordValid():Boolean{
    return this.loginForm.controls.password.invalid && this.loginForm.controls.password.touched
  }

  register(){
    this.router.navigate(['register'])
  }
}
