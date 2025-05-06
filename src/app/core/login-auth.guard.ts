import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = true;
  return isLoggedIn
    ? router.createUrlTree(['login'])
    : router.createUrlTree(['dashboard']);
};
