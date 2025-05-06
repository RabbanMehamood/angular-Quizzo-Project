import { NgModule } from '@angular/core';
import { ExamQuestionPageRoutingModule } from './exam-question-page-routing.module';
import { ExamQuestionPageComponent } from './exam-question-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ExamQuestionPageComponent],
  imports: [
    ExamQuestionPageRoutingModule,
    ReactiveFormsModule,
    NgFor,
    CommonModule,
    ButtonModule,
  ],
})
export class ExamQuestionPageModule {}
