import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthBusinessService } from '../../../../business/auth_business';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthBusinessService
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
        const result = await this.authService.login(loginCommand);
        console.log('Login successful:', result);
        // Aqui você pode redirecionar o usuário ou executar ações adicionais após o login bem-sucedido.
      } catch (error: any) {
        console.log("auth_page, erro:", error)
        console.error('Login failed:', error.message);
        // Aqui você pode exibir mensagens de erro ou tomar outras ações em caso de falha no login.
      }
    }
  }
}
