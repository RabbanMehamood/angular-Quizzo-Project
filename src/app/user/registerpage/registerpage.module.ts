import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterpageRoutingModule } from './registerpage-routing.module';
import { RegisterpageComponent } from './registerpage.component';
import { FormsModule } from '@angular/forms';

import { InputText, InputTextModule } from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
  declarations: [RegisterpageComponent],
  imports: [
    CommonModule,
    RegisterpageRoutingModule,
    ButtonModule,
    RegisterpageRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
  ],
})
export class RegisterpageModule {}
