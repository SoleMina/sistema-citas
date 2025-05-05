import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  get usernameControl() {
    return this.loginForm.get('correo');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
  get usernameControlIsValid() {
    return this.usernameControl?.valid && this.usernameControl.touched;
  }
  get usernameControlIsInvalid() {
    return this.usernameControl?.invalid && this.usernameControl.touched;
  }

  get usernameErrors() {
    return this.usernameControl?.errors;
  }
  get passwordErrors() {
    return this.passwordControl?.errors;
  }

  onSubmit() {
    const formDataLogin = this.loginForm.value;
    console.log(formDataLogin, 'formDataLogin');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this.authService.login(formDataLogin);
    }
  }
}
