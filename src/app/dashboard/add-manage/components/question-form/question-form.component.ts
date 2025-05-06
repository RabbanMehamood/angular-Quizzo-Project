import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
  standalone: false,
})
export class QuestionFormComponent implements OnInit {
  counter: number = 1;
  questionform: FormGroup = new FormGroup({
    questionText: new FormControl(''),
    optionA: new FormControl(''),
    optionB: new FormControl(''),
    optionC: new FormControl(''),
    optionD: new FormControl(''),
    correctAnswer: new FormControl(''),
    timer: new FormControl(20),
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private questionApiService: QuestionsapiService
  ) {}

  ngOnInit(): void {
    this.questionApiService.getQuestionsList().subscribe({
      next: (res: any) => {
        console.log({ res });
      },
    });
  }

  onSubmit(): void {
    this.counter++;
    this.submitted = true;
    alert('submit Worked');
    if (this.questionform.invalid) {
      return;
    }

    const postValue = this.questionform.value;
    console.log(JSON.stringify(this.questionform.value, null, 2));
    this.questionApiService
      .createQuestion({ ...postValue, id: this.counter })
      .subscribe({
        next: (res: any) => {
          console.log({ res });
        },
      });
  }

  onReset(): void {
    this.submitted = false;
    this.questionform.reset();
  }
}
import { QuestionsapiService } from '../../services/questionsapi.service';
