import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userid = localStorage.getItem('userId');
  const sessionToken = sessionStorage.getItem('examSessionTabId');
  console.log(sessionToken);
  sessionToken;
  if (userid && sessionToken) {
    return true;
  } else {
    alert(
      'Exam has already started in a Tab, Not allow duplicate tab for exam page'
    );
    router.navigate(['']);
    return false;
  }
};
