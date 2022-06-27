import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  showLoginError: boolean = false;
  loginError: string = 'Usuario o la contraseña son incorrectos';

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  isInvalid(field: keyof typeof this.loginForm.controls) {
    return (
      this.loginForm.controls[field].errors &&
      this.loginForm.controls[field].touched
    );
  }

  getErrorMessage(field: keyof typeof this.loginForm.controls): string {
    const errors = this.loginForm.get(field)?.errors;

    if (errors?.['required']) {
      return `El campo ${field} es requerido`;
    } else if (errors?.['email']) {
      return `El campo ${field} no tiene un formato válido`;
    }

    return '';
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const isValidCredentials = this.authService.loginMock(email!, password!);

    if (!isValidCredentials) {
      this.showLoginError = true;
      return;
    }

    this.dialogRef.close();
  }
}
