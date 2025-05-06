import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamQuestionPageComponent } from './exam-question-page.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: ExamQuestionPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, CommonModule],
})
export class ExamQuestionPageRoutingModule {}
