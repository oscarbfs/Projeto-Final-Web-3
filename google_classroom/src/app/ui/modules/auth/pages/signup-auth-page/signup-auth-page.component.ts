import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserBusiness } from '../../../../business/user_business';
import { CreateUserCommand } from '../../../../../domain/models/commands/create_user_command';

@Component({
  selector: 'gc-signup-auth-page',
  templateUrl: './signup-auth-page.component.html',
  styleUrls: ['./signup-auth-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class SignupAuthPageComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userBusiness: UserBusiness,
    private router: Router,
    private location: Location
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    this.successMessage = null;
    this.errorMessage = null;
    if (this.signupForm.valid) {
      const name = this.signupForm.value.name;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      const createCommand = new CreateUserCommand(name, email, password);

      try {
        const user = await this.userBusiness.createUser(createCommand);

        if (user) {
          this.successMessage = 'Cadastro realizado com sucesso. Redirecionando para a tela de login...';

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000); 
        } else {
          throw Error("Erro ao se cadastrar. Por favor, tente novamente mais tarde.")
        }
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }

  goBack(): void {
    this.location.back();
}
}
