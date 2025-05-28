import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');
  const password = localStorage.getItem('password');
  if (role === 'Admin' && password === 'quizzoito') {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
