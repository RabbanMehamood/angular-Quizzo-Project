import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongratsPageRoutingModule } from './congrats-page-routing.module';
import { CongratsPageComponent } from './congrats-page.component';


@NgModule({
  declarations: [
    CongratsPageComponent
  ],
  imports: [
    CommonModule,
    CongratsPageRoutingModule
  ]
})
export class CongratsPageModule { }
