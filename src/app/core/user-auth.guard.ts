import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userid = localStorage.getItem('userId');

  if (userid) {
    return true;
    // allow the redirection
  } else {
    router.navigate(['']); // Or a login page
    return false;
  }
};
