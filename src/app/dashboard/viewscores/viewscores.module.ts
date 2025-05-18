import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewscoresRoutingModule } from './viewscores-routing.module';
import { ViewscoresComponent } from './viewscores.component';
import { TableModule } from 'primeng/table';

import { Button, ButtonModule } from 'primeng/button';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewscoresComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ViewscoresRoutingModule,
    TableModule,
    Button,
    OverlayPanelModule,
    ButtonModule,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    ChipsModule,
    FormsModule,
  ],
})
export class ViewscoresModule {}
