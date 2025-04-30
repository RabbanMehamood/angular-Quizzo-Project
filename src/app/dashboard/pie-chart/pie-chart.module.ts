import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieChartRoutingModule } from './pie-chart-routing.module';
import { PieChartComponent } from './pie-chart.component';


@NgModule({
  declarations: [
    PieChartComponent
  ],
  imports: [
    CommonModule,
    PieChartRoutingModule
  ]
})
export class PieChartModule { }
