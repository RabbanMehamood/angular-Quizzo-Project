import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddManageRoutingModule } from './add-manage-routing.module';
import { AddManageComponent } from './add-manage.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuizSummaryTableComponent } from './components/quiz-summary-table/quiz-summary-table.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
  declarations: [
    AddManageComponent,
    QuestionFormComponent,
    QuizSummaryTableComponent,
  ],
  imports: [
    CommonModule,
    AddManageRoutingModule,
    FormsModule,
    InputTextareaModule,
    TableModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
})
export class AddManageModule {}
