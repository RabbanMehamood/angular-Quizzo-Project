import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [AuthComponent, LoginComponent, SignUpComponent],
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    PasswordModule,
  ],
})
export class AuthModule {}
