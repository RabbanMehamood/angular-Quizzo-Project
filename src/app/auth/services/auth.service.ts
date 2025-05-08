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

  loginAdmin(value: any) {
    let adminObject = value;
    console.log(adminObject);
    // alert(JSON.stringify(value));
    localStorage.setItem('userRole', 'Admin');
    localStorage.setItem('password', 'quizzoito');
    if (
      adminObject.username === 'Admin' &&
      adminObject.password === 'quizzoito'
    ) {
      this._router.navigate(['dashboard/add-manage']);
    } else {
      confirm('Unauthorised Access, Please Login as a User');
      this._router.navigate(['']);
    }

    // this._api.loginAdmin$().subscribe({
    //   next: (res: any) => {
    //    Success and Authenticated
    //     localStorage.setItem('userRole', 'Admin'); // or 'User', etc.
    //   },
    // });
  }
  logoutAsAdmin() {
    alert('removed local storage key and values');
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
        this._router.navigate(['user-layout/exam-question-page']);
        // or 'User', etc.
        // this.setAuthenticated(true);
        // if (res.loginType === 'user') {
        //   this.redirectToUser();
        // } else {
        //   default
        //   this.redirectToAdmin();
        // }
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
