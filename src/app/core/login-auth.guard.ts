import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const isLoggedIn = true;
  // return isLoggedIn
  //  ? router.createUrlTree(['login'])
  //   : router.createUrlTree(['dashboard']);
  const role = localStorage.getItem('userRole');
  const password = localStorage.getItem('password');
  if (role === 'Admin' && password === 'quizzoito') {
    return true; // allow the redirection
  } else {
    router.navigate(['']); // Or a login page
    return false;
  }
};
