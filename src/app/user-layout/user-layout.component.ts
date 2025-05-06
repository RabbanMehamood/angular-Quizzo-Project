import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {
  steps = [{ title: 'Register' }, { title: 'Quiz' }, { title: 'Submit' }];
  constructor(private router: Router) {}
}
