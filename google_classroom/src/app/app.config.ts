import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import routeConfig from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig), 
    provideClientHydration(), 
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClient), 
    provideHttpClient(withFetch())
  ]
};
