import { HttpInterceptorFn } from '@angular/common/http';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://localhost:7005/StoreManagement';
  const authReq = req.clone({
    url: `${baseUrl}/${req.url}`,
  });
  return next(authReq);
};
