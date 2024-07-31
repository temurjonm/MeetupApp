import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const _accountService = inject(AccountService);
  if (_accountService.currentUser()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${_accountService.currentUser()?.token}`
      }
    })
  }
  return next(req);
};
