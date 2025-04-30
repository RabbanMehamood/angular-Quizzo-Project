import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private readonly _auth: AuthService) {}
  value: string = '';
  ngOnInit(): void {}

  /**
   * On login form submit, check for the auth verification
   */
  onSubmit() {
    this._auth.loginUser();
  }
}
