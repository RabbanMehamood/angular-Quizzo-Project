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

  loginAdmin(value: any): boolean {
    const { username, password } = value;
    if (username === 'Admin' && password === 'quizzoito') {
      localStorage.setItem('userRole', 'Admin');
      localStorage.setItem('password', 'quizzoito');
      return true;
    } else {
      return false;
    }
  }

  logoutAsAdmin() {
    localStorage.clear();
    this._router.navigate(['']);
  }

  logoutAsUser() {
    localStorage.clear();
    localStorage.removeItem('userRole');
    localStorage.removeItem('password');
    localStorage.removeItem('userId');
    this._router.navigate(['']);
  }
  loginUser(value) {
    this._api.loginUser$(value).subscribe({
      next: (res: any) => {
        console.log(value.id);
        localStorage.removeItem('userRole');
        localStorage.removeItem('password');
        localStorage.setItem('userId', value.id);
        localStorage.setItem('username', value.name);
        const currentTabId = crypto.randomUUID();
        sessionStorage.setItem(
          'examSessionTabId',
          JSON.stringify({ currentTabId })
        );
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

  isAdminAuthenticated(): boolean {
    return !!localStorage.getItem('userRole');
  }
}
