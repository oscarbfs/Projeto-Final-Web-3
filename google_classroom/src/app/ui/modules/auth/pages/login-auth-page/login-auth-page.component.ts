import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthBusinessService } from '../../../../business/auth_business';
import { LoginCommand } from '../../../../../domain/models/commands/login_command';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'gc-login-auth-page',
  templateUrl: './login-auth-page.component.html',
  styleUrl: './login-auth-page.component.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
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
        console.error('Login failed:', error.message);
        // Aqui você pode exibir mensagens de erro ou tomar outras ações em caso de falha no login.
      }
    }
  }
}
