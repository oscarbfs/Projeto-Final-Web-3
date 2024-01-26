import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthBusiness } from '../../../../business/auth_business';
import { LoginCommand } from '../../../../../domain/models/commands/login_command';

@Component({
  selector: 'gc-login-auth-page',
  templateUrl: './login-auth-page.component.html',
  styleUrl: './login-auth-page.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginAuthPageComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authBusiness: AuthBusiness
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      
      const loginCommand = new LoginCommand(email, password);

      try {
        const result = await this.authBusiness.login(loginCommand);

        if (result.token) {
          console.log('Login successful:', result);
        } else {
          throw Error("Erro ao fazer login. Por favor, tente novamente mais tarde.")
        }
      } catch (error: any) {
        console.log('Login failed:', error.message);
        this.errorMessage = error.message;
      }
    }
  }
}

