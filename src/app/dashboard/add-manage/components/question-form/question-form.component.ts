import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QuestionsapiService } from '../../services/questionsapi.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
  standalone: false,
})
export class QuestionFormComponent implements OnInit {
  isEditable: boolean = false;
  counter: number = 0;
  questionform: FormGroup = new FormGroup({
    questionText: new FormControl(''),
    optionA: new FormControl(''),
    optionB: new FormControl(''),
    optionC: new FormControl(''),
    optionD: new FormControl(''),
    correctAnswer: new FormControl(''),
    timerInSeconds: new FormControl(20),
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private questionApiService: QuestionsapiService,
    private readonly _stateService: StateService
  ) {}

  ngOnInit(): void {
    this.questionApiService.getQuestionsList().subscribe({
      next: (res: any) => {
        console.log({ res });
        this.counter = res.length;
        console.log(this.counter);
      },
    });

    this._editQuestion();
  }

  private _editQuestion() {
    this._stateService.message$.subscribe({
      next: (question: any) => {
        if (question) {
          this._setFromValue(question);
          this.isEditable = true;
        }
      },
    });
  }

  private _setFromValue(question: any) {
    this.questionform.setValue({
      questionText: question.questionText,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
      timerInSeconds: question.timerInSeconds,
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.questionform.invalid) {
      return;
    }

    if (!this.isEditable) {
      // insert / Add
      this.counter = this.counter + 1;
      const postValue = this.questionform.value;
      alert(JSON.stringify(this.questionform.value, null, 2));
      this.questionApiService
        .createQuestion({ ...postValue, id: this.counter })
        .subscribe({
          next: (res: any) => {
            console.log({ res });
          },
        });
    } else {
      // only for update
      const postValue = this.questionform.value;
      alert(JSON.stringify(this.questionform.value, null, 2));
      this.questionApiService
        .putQuestion({ ...postValue, id: this.counter })
        .subscribe({
          next: (res: any) => {
            console.log({ res });
            this.isEditable = true;
          },
        });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.questionform.reset();
    this.isEditable = false;
  }
}
