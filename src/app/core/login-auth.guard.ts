import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = true;
  return isLoggedIn ? true : router.createUrlTree(['dashboard']);
};
