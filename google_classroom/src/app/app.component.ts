import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginAuthPageComponent } from '../app/ui/modules/auth/pages/login-auth-page/login-auth-page.component';
import { SignupAuthPageComponent } from '../app/ui/modules/auth/pages/signup-auth-page/signup-auth-page.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    LoginAuthPageComponent,
    SignupAuthPageComponent,
  ],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'google_classroom';
}
