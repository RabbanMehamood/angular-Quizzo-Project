import { Component, input, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class UserLayoutComponent implements OnInit {
  username: string = '';
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
    this.username = localStorage.getItem('username');

    this.updateSteps(this.router.url); // initial step update

    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSteps(event.urlAfterRedirects);
        this.username = localStorage.getItem('username');
      });
  }

  updateSteps(url: string): void {
    this.steps.forEach((step) => (step.is_active = false)); // reset all

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
