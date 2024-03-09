import { Routes } from '@angular/router';
import { LoginAuthPageComponent } from './ui/modules/auth/pages/login-auth-page/login-auth-page.component';
import { SignupAuthPageComponent } from './ui/modules/auth/pages/signup-auth-page/signup-auth-page.component';

import { OverviewClassPageComponent } from './ui/modules/class/pages/overview-class-page/overview-class-page.component';
import { CreateClassPageComponent } from './ui/modules/class/pages/create-class-page/create-class-page.component';

const routeConfig: Routes = [
    {
        path: '',
        component: LoginAuthPageComponent,
        title: "Login"
    },
    {
        path: 'signup',
        component: SignupAuthPageComponent,
        title: "Cadastro"
    },

    {
        path: 'classes',
        component: OverviewClassPageComponent,
        title: "Turmas"
    },
    {
        path: 'createClasses',
        component: CreateClassPageComponent,
        title: "Criar Turmas"
    }
];

export default routeConfig;
