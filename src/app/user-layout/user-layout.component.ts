import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  providers: [ConfirmationService, MessageService],
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

  constructor(
    private router: Router,
    private _auth: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('currentPath', `${this.router.url}`);
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

  logout(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to log out?',
      icon: 'pi pi-sign-out',
      accept: () => {
        this._auth.logoutAsAdmin();
        this.messageService.add({
          severity: 'success',
          summary: 'Logged Out',
          detail: 'You have been successfully logged out',
          life: 3000,
        });
        this.router.navigate(['']);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'You remained logged in',
          life: 2000,
        });
      },
    });
  }

  makeSidebarTrue(): void {
    this.sidebarVisible = true;
  }
  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log('Dark Mode activated');
  }
}
