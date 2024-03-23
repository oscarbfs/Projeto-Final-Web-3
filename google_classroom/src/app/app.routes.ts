import { Routes } from '@angular/router';
import { LoginAuthPageComponent } from './ui/modules/auth/pages/login-auth-page/login-auth-page.component';
import { SignupAuthPageComponent } from './ui/modules/auth/pages/signup-auth-page/signup-auth-page.component';

import { OverviewClassPageComponent } from './ui/modules/class/pages/overview-class-page/overview-class-page.component';
import { CreateClassPageComponent } from './ui/modules/class/pages/create-class-page/create-class-page.component';
import { DetailClassPageComponent } from './ui/modules/class/pages/detail-class-page/detail-class-page.component';
import { DetailActivityPageComponent } from './ui/modules/activity/pages/detail-activity-page/detail-activity-page.component';
import { DetailResponseActivityPageComponent } from './ui/modules/activity/pages/detail-response-activity-page/detail-response-activity-page.component';

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
    },
    {
        path: 'detailClass/:id',
        component: DetailClassPageComponent,
        title: "Turma"
    },
    {
        path: 'detailActivity/:id',
        component: DetailActivityPageComponent,
        title: "Atividade"
    },
    {
        path: 'detailResponseActivity/:id',
        component: DetailResponseActivityPageComponent,
        title: "Resposta da Atividade"
    },
];

export default routeConfig;
