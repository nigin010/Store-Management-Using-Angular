import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const baseUrl = 'https://localhost:7005';
  let authReq = req.clone({
    url: `${baseUrl}/${req.url}`,
  });
  const token = authService.getToken();
  if (token) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(authReq);
};
