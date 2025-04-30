import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly _api: ApiService,
    private readonly _router: Router
  ) {}

  loginUser() {
    this._api.loginUser$().subscribe({
      next: (res: any) => {
        this.setAuthenticated(true);
        if (res.loginType === 'user') {
          this.redirectToUser();
        } else {
          // default
          this.redirectToAdmin();
        }
      },
      complete() {},
      error(err) {
        throw new Error(err);
      },
    });
  }

  setAuthenticated(value: boolean) {
    return value;
  }

  redirectToAdmin() {
    this._router.navigate(['/admin']);
  }

  redirectToUser() {
    this._router.navigate(['/user']);
  }
}
