import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private readonly _auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  loginform: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginform.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Not Authorized',
        detail: 'Login Credentials are not valid Admin credentials',
      });
      this.loginform.reset();
      return;
    }

    const success = this._auth.loginAdmin(this.loginform.value);
    if (success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'Successfully logged in as Admin',
        life: 2000,
      });
      setTimeout(() => {
        this.router.navigate(['dashboard/add-manage']);
      }, 2000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Incorrect credentials. Please try again.',
      });
    }
  }

  // onSubmit(): void {
  //   this.submitted = true;

  //   if (this.loginform.invalid) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Not Authorized',
  //       detail: 'Login Credentials are not valid Admin credentials',
  //     });
  //     this.loginform.reset();
  //     return;
  //   }

  //   if (this.loginform.valid) {
  //     this._auth.loginAdmin(this.loginform.value).subscribe(
  //       (res) => {
  //         // You can add login checks here if needed
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Login Successful',
  //           detail: 'Successfully logged in as Admin',
  //         });
  //         // optionally navigate
  //         // this.router.navigate(['/dashboard']);
  //       },
  //       (error) => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Login Failed',
  //           detail: 'Incorrect credentials or server error',
  //         });
  //       }
  //     );
  //   }
  // }

  // onSubmit(): void {
  //   this.submitted = true;
  //   if (this.loginform.invalid) {
  //  this.messageService.add({
  //       severity: 'error',
  //       summary: 'Not Authorized',
  //       detail: 'Login Credentials are not valid Admin credentials',
  //     });
  //     this.loginform.reset();
  //     return;
  //   } else if (this.loginform.valid) {

  //     // this.goToRoute();

  //
  //   }
  // }

  onReset(): void {
    this.submitted = false;
    this.loginform.reset();
  }
  /**
   * On login form submit, check for the auth verification
   */
  // onSubmit() {
  //   this._auth.loginUser();
  // }
}
