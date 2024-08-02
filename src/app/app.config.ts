import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { userInterceptor } from './user.interceptor';
import { AuthenticationService } from './services/authentication.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([userInterceptor])),
    provideRouter(routes),
    AuthenticationService,
  ],
};
