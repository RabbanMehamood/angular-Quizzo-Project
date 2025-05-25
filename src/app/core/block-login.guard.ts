import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const blockLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');
  const password = localStorage.getItem('password');

  

  if (role !== null && password !== null) {
    const currentUrl = router.url;
    router.navigate([currentUrl]);
    return false;
  }
  return true;
};
