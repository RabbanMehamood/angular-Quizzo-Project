import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { NotificationServiceService } from '../notification-service.service';
import { StateService } from '../../dashboard/add-manage/services/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  providers: [ConfirmationService, MessageService, Sidebar],
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  questionFormTouched: boolean = false;
  sidebarVisible: boolean = false;
  notifications: any;
  notificationsMessage!: Subscription;
  // questionFormTouchedMessage!: Subscription;
  constructor(
    private router: Router,
    private _auth: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private getNotifications: NotificationServiceService,
    private questionFormTouch: StateService
  ) {}

  ngOnInit(): void {
    this.notificationsMessage =
      this.getNotifications.notificationsMessage.subscribe((data) => {
        console.log(data);
        this.notifications = data;
      });

    this.questionFormTouch.questionFormTouchedMessage$.subscribe((touched) => {
      this.questionFormTouched = touched;
    });
  }
  confirmLogout(event: Event): void {
    if (this.questionFormTouched) {
      // If form is dirty
      this.confirmationService.confirm({
        target: event.target as HTMLElement,
        key: 'confirmInProgressForm',
        message: 'You have unsaved changes. Are you sure you want to log out?',
        header: 'Unsaved Changes',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        rejectButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.logout();
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelled',
            detail: 'Logout cancelled.',
            life: 2000,
          });
        },
      });
    } else {
      // If form is clean
      this.confirmationService.confirm({
        target: event.target as HTMLElement,
        key: 'confirmLogout',
        message: 'Are you sure you want to log out?',
        header: 'Confirm Logout',
        icon: 'pi pi-sign-out',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        rejectButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.logout();
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelled',
            detail: 'Logout cancelled.',
            life: 2000,
          });
        },
      });
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log('Dark Mode activated');
  }

  ngOnDestroy(): void {
    this.notificationsMessage.unsubscribe();
    // this.questionFormTouchedMessage.unsubscribe();
  }

  logout(): void {
    this._auth.logoutAsAdmin();
    this.messageService.add({
      severity: 'success',
      summary: 'Logged Out',
      detail: 'You have been successfully logged out.',
      life: 2000,
    });
    this.router.navigate(['']);
  }
}
