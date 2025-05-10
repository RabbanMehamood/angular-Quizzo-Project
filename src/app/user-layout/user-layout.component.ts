import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent implements OnInit {
  steps = [
    {
      title: 'Register',
      is_active: false,
      relatedRoute: '/user-layout/register-page',
    },
    {
      title: 'Quiz',
      is_active: false,
      relatedRoute: '/user-layout/exam-question-page',
    },
    {
      title: 'Submit',
      is_active: false,
      relatedRoute: '/user-layout/congrats-page',
    },
  ];
  currentUrl: string = '';
  sidebarVisible: boolean = false;

  constructor(private router: Router, private _auth: AuthService) {}
  logout() {
    this._auth.logoutAsAdmin();
  }
  ngOnInit(): void {
    const url = this.router.url;
    this.currentUrl = url;

    if (url === this.steps[0].relatedRoute) {
      this.steps[0].is_active = true;
    } else if (url === this.steps[1].relatedRoute) {
      this.steps[0].is_active = true;
      this.steps[1].is_active = true;
    } else if (url === this.steps[2].relatedRoute) {
      this.steps[0].is_active = true;
      this.steps[1].is_active = true;
      this.steps[2].is_active = true;
    }
  }
  makeSidebarTrue() {
    this.sidebarVisible = true;
  }
}
