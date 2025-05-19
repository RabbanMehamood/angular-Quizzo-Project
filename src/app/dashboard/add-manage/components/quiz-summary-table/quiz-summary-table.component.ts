import { Component, OnInit } from '@angular/core';
import { QuestionsapiService } from '../../services/questionsapi.service';
import { StateService } from '../../services/state.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-quiz-summary-table',
  templateUrl: './quiz-summary-table.component.html',
  styleUrl: './quiz-summary-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class QuizSummaryTableComponent implements OnInit {
  questions: any[] = [];
  loading: boolean = false;

  
  totalRecords = 0;
  rows = 7;
  first = 0;
  goToPageNumber: number;
  maxPage: number = 1;

  constructor(
    private questionsapiService: QuestionsapiService,
    private readonly _stateService: StateService,
    private readonly _questionApiService: QuestionsapiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    
    this.loadquestiondata();
    this._stateService.updateMsg$.subscribe({
      next: (res: any) => {
        if (res) {
          this.loadquestiondata();
        }
      },
    });
  }

  loadquestiondata() {
    this.questionsapiService.getQuestionsList().subscribe((response) => {
      this.questions = response;

      this.totalRecords = this.questions.length;
      this.maxPage = Math.ceil(this.totalRecords / this.rows);
      this.goToPageNumber = 1;

      console.log('this is response:', response);
    });
  }

  onPage(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.maxPage = Math.ceil(this.totalRecords / this.rows);
    this.goToPageNumber = event.page + 1;
  }

  goToPage() {
    const targetPage = this.goToPageNumber;

    if (targetPage >= 1 && targetPage <= this.maxPage) {
      this.first = (targetPage - 1) * this.rows;
    } else {
      alert('Invalid page number.');
    }
  }

  edit(question: any) {
    console.log('Question Id to edit:', question);
    this._stateService.sendMessage(question);
  }

  delete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this._questionApiService.delete(id).subscribe({
          next: () => {
            setTimeout(() => {
              this.loadquestiondata();
            }, 2000);
          },
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
          life: 1000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 500,
        });
      },
    });
  }
}
