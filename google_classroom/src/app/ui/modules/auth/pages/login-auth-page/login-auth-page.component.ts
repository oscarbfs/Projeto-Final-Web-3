import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthBusiness } from '../../../../business/auth_business';
import { LoginCommand } from '../../../../../domain/models/commands/login_command';
import { SetAuthMapper } from '../../../../../domain/models/mappers/set_auth_mapper';

@Component({
  selector: 'gc-login-auth-page',
  templateUrl: './login-auth-page.component.html',
  styleUrl: './login-auth-page.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginAuthPageComponent {
  authData: SetAuthMapper | null = null;
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authBusiness: AuthBusiness,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      
      const loginCommand = new LoginCommand(email, password);

      try {
        const result = await this.authBusiness.login(loginCommand);

        if (result.token) {
          this.authData = result;
          console.log(result.token)
          this.router.navigate(['/classes']);
        } else {
          throw Error("Erro ao fazer login. Por favor, tente novamente mais tarde.")
        }
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}

