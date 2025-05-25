import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddManageRoutingModule } from './add-manage-routing.module';
import { AddManageComponent } from './add-manage.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizSummaryTableComponent } from './components/quiz-summary-table/quiz-summary-table.component';
import { InputTextModule } from 'primeng/inputtext';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
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
    ToastModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
  ],
  providers: [ConfirmationService],
})
export class AddManageModule {}
