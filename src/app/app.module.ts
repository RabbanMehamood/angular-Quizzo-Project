import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout/dashboard-layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TerminalModule } from 'primeng/terminal';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { TagContentType } from '@angular/compiler';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    WelcomeComponent,
    UserLayoutComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    ConfirmPopupModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarModule,
    ToastModule,
    RippleModule,
    TerminalModule,
    TableModule,
    DialogModule,
    TagModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    ConfirmDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
