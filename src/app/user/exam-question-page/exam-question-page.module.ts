import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamQuestionPageRoutingModule } from './exam-question-page-routing.module';
import { ExamQuestionPageComponent } from './exam-question-page.component';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ExamQuestionPageComponent],
  imports: [
    ExamQuestionPageRoutingModule,
    ReactiveFormsModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RadioButtonModule,
  ],
})
export class ExamQuestionPageModule {}
