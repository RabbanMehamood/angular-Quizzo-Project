import { Component, OnInit } from '@angular/core';
import { QuestionsapiService } from '../../services/questionsapi.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-quiz-summary-table',
  templateUrl: './quiz-summary-table.component.html',
  styleUrl: './quiz-summary-table.component.scss',
})
export class QuizSummaryTableComponent implements OnInit {
  questions: any[] = [];
  loading: boolean = false;
  constructor(
    private questionsapiService: QuestionsapiService,
    private readonly _stateService: StateService,
    private readonly _questionApiService: QuestionsapiService
  ) {}

  ngOnInit(): void {
    this.loadquestiondata();
  }

  loadquestiondata() {
    this.loading = true;

    this.questionsapiService.getQuestionsList().subscribe((response) => {
      this.questions = response;
      console.log('this is response:', response);
    });

    this.loading = false;
  }
  edit(question: any) {
    console.log('Question Id to edit:', question);
    this._stateService.sendMessage(question);
  }

  delete(id: number) {
    console.log(`question id to delete: ${id}`);
    this._questionApiService.delete(id).subscribe({
      next: (response: any) => {
        console.log(response);
      },
    });
  }
}
