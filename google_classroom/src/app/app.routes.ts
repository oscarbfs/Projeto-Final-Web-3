import { Routes } from '@angular/router';
import { LoginAuthPageComponent } from './ui/modules/auth/pages/login-auth-page/login-auth-page.component';
import { SignupAuthPageComponent } from './ui/modules/auth/pages/signup-auth-page/signup-auth-page.component';

const routeConfig: Routes = [
    {
        path: '',
        component: LoginAuthPageComponent,
        title: "Login Page"
    },
    {
        path: 'signup',
        component: SignupAuthPageComponent,
        title: "Signup Page"
    }
];

export default routeConfig;
