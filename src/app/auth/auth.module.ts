import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
