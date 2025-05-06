import { Component } from '@angular/core';
import { QuestionsapiService } from '../../services/questionsapi.service';

@Component({
  selector: 'app-quiz-summary-table',
  templateUrl: './quiz-summary-table.component.html',
  styleUrl: './quiz-summary-table.component.scss',
})
export class QuizSummaryTableComponent {
  questions = [];
  constructor(private questionsapiService: QuestionsapiService) {}
  ngOnInit(): void {
    this.questionsapiService.getQuestionsList().subscribe((response) => {
      this.questions = response;
      console.log(this.questions);
    });
  }
}
