import { bootstrapApplication,provideProtractorTestingSupport,  } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      provideHttpClient(), provideAnimationsAsync()
    ]
  }
).catch(err => console.error(err));
