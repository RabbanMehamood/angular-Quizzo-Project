import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private readonly _auth: AuthService,
    private router: Router
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
      // form is invalid
      alert('Login Credentials are not of Admin');
      this.loginform.reset();
      return;
    } else if (this.loginform.valid) {
      // alert('submitted');
      console.log(this.loginform.value);
      // this.goToRoute();

      this._auth.loginAdmin(this.loginform.value);
    }
  }

  // goToRoute() {
  //   this.router.navigate(['dashboard/add-manage']);
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
