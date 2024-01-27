import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import routeConfig from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthService } from './infra/services/auth_service';
import { AuthBusiness } from './ui/business/auth_business';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig), 
    provideClientHydration(), 
    AuthService,
    AuthBusiness,
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClient), 
    provideHttpClient(withFetch())
  ]
};
