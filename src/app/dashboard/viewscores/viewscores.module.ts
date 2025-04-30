import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewscoresRoutingModule } from './viewscores-routing.module';
import { ViewscoresComponent } from './viewscores.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ViewscoresComponent],
  imports: [CommonModule, ViewscoresRoutingModule, TableModule],
})
export class ViewscoresModule {}
