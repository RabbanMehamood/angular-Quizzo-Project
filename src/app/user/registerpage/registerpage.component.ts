import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ViewusersService } from '../../dashboard/viewscores/services/viewusers.service';
import { ApiService } from '../../auth/services/api.service';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.scss',
})
export class RegisterpageComponent {
  submitted: boolean = false;
  counter: number;
  generatedId: number = 0;
  registerform: FormGroup = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(),
    email: new FormControl(''),
    qualification: new FormControl(''),
  });
  userObject: {} = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _usersCount: ViewusersService,
    private _auth: AuthService
  ) {
    // console.log(this.generatedId);
  }
  ngOnInit(): void {
    this._usersCount.getUsers().subscribe({
      next: (response) => {
        this.generatedId = response.length + 1;
        console.log(this.generatedId);
      },
    });
    console.log(this.generatedId);
    this.registerform = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      qualification: [''],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerform.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.registerform.invalid) {
      // form is invalid
      return;
    } else {
      console.log(this.generatedId);
      alert('submit');

      console.log(this.registerform.valid);
      this.userObject = {
        id: this.generatedId,
        ...this.registerform.value,
      };
      this._auth.loginUser(this.userObject);
      console.log(this.userObject);
      this.goToRoute();
    }
  }

  goToRoute() {
    this.router.navigate(['user-layout/exam-question-page']);
  }
  onReset(): void {
    this.submitted = false;
    this.registerform.reset();
  }
}
