import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

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

  //functions, variables to run after component loads
  ngOnInit(): void {
    localStorage.clear();
    localStorage.setItem('currentPath', `${this.router.url}`);
    console.log(localStorage.getItem('currentPath'));
    this.loginform = this.formBuilder.group({
      username: [
        'Admin',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      password: [
        'quizzoito',
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
  onReset(): void {
    this.submitted = false;
    this.loginform.reset();
  }
}
