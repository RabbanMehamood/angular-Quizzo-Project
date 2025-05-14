import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const blockUserLoginpageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = localStorage.getItem('userId');

  if (userId !== null) {
    const currentUrl = router.url;
    console.log(currentUrl);
    router.navigate([currentUrl]);
    return false;
  }
  return true;
};
