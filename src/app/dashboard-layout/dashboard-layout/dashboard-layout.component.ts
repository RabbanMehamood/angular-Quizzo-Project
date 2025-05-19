import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DarkmodeService } from '../../auth/services/darkmode.service';
import { Sidebar, SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  providers: [ConfirmationService, MessageService, Sidebar],
})
export class DashboardLayoutComponent {
  sidebarVisible: boolean = false;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private darkModeStatus: DarkmodeService
  ) {}
  confirmLogout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: 'Are you sure you want to log out?',
      icon: 'pi pi-sign-out',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this._auth.logoutAsAdmin();
        this.messageService.add({
          severity: 'success',
          summary: 'Logged Out',
          detail: 'You have been successfully logged out.',
          life: 2000,
        });
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
  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log('Dark Mode activated');
  }
}
