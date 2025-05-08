import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewscoresRoutingModule } from './viewscores-routing.module';
import { ViewscoresComponent } from './viewscores.component';
import { TableModule } from 'primeng/table';
import { Dialog, DialogModule } from 'primeng/dialog';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [ViewscoresComponent],
  imports: [
    CommonModule,
    ViewscoresRoutingModule,
    TableModule,
    DialogModule,
    Button,
    ButtonModule,
  ],
})
export class ViewscoresModule {}
