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
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.scss',
  providers: [MessageService],
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
    private _auth: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._usersCount.getUsers().subscribe({
      next: (response) => {
        this.generatedId = response.length + 1;
      },
    });

    this.registerform = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      qualification: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerform.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerform.invalid) return;
    

    this.userObject = {
      id: this.generatedId,
      ...this.registerform.value,
    };

    this._auth.loginUser(this.userObject);

    this.messageService.add({
      severity: 'success',
      summary: 'Registered',
      detail: 'Registration successful, redirecting to exam page...',
      life: 3000, // Show for 2 seconds
    });

    setTimeout(() => {
      this.router.navigate(['user-layout/exam-question-page']);
    }, 3000);
  }

  onReset(): void {
    this.submitted = false;
    this.registerform.reset();
  }
}
