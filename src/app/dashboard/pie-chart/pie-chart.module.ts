import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieChartRoutingModule } from './pie-chart-routing.module';
import { PieChartComponent } from './pie-chart.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [PieChartComponent],
  imports: [CommonModule, PieChartRoutingModule, ChartModule],
})
export class PieChartModule {}
