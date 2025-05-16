import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuestionsapiService } from '../../services/questionsapi.service';
import { StateService } from '../../services/state.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
  standalone: false,
  providers: [MessageService],
})
export class QuestionFormComponent implements OnInit {
  isEditable: boolean = false;
  counter: number = 0;
  editQuestionId: any;
  formValid: boolean = true;
  questionform: FormGroup = new FormGroup({
    id: new FormControl(''),
    questionText: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    optionA: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    optionB: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    optionC: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    optionD: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    correctAnswer: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    timerInSeconds: new FormControl(20, [Validators.required]),
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private questionApiService: QuestionsapiService,
    private readonly _stateService: StateService,
    private messageService: MessageService
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

  /**
   * Set values for forms
   */
  private _editQuestion() {
    this._stateService.message$.subscribe({
      next: (question: any) => {
        if (question) {
          this.questionform.setValue({
            id: question.id,
            questionText: question.questionText,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            correctAnswer: question.correctAnswer,
            timerInSeconds: question.timerInSeconds,
          });
          this.isEditable = true;
        }
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.questionform.invalid) {
      return;
    }
    const formOptions = this.questionform.value;
    const options = [
      formOptions.optionA?.trim().toLowerCase(),
      formOptions.optionB?.trim().toLowerCase(),
      formOptions.optionC?.trim().toLowerCase(),
      formOptions.optionD?.trim().toLowerCase(),
    ];
    const uniqueOptions = new Set(options);
    console.log(formOptions);
    if (options.length !== uniqueOptions.size) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Options Duplicacy Not Allowed',
        life: 2000,
      });
      return;
    }
    const correctAnswer = options.some(
      (option) => option.trim() === this.questionform.value.correctAnswer.trim()
    );
    if (correctAnswer) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Correct Answer Must be from given options',
        life: 2000,
      });
      return;
    }

    console.log({ isEditable: this.isEditable });

    if (!this.isEditable) {
      // insert / Add
      this.counter++;
      const postValue = this.questionform.value;

      // console.log(postValue);
      // alert(JSON.stringify(this.questionform.value));
      this.questionApiService
        .createQuestion({ ...postValue, id: this.counter })
        .subscribe({
          next: (res: any) => {
            this._stateService.sendEditUpdateMessage(true);
            console.log({ res });
          },
        });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Question Added Successfully.',
        life: 2000,
      });
      this.onReset();
    } else {
      // only for update
      const postValue = this.questionform.value;

      const editOptions = [
        postValue.optionA?.trim().toLowerCase(),
        postValue.optionB?.trim().toLowerCase(),
        postValue.optionC?.trim().toLowerCase(),
        postValue.optionD?.trim().toLowerCase(),
      ];
      const uniqueOptions = new Set(editOptions);
      console.log(formOptions);
      if (editOptions.length !== uniqueOptions.size) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Options Duplicacy Not Allowed',
          life: 2000,
        });
        return;
      }
      const editCorrectAnswer = editOptions.some(
        (option) =>
          option.trim() === postValue.correctAnswer.toLowerCase().trim()
      );
      if (editCorrectAnswer) {
        // alert(JSON.stringify(this.questionform.value, null, 2));
        this.questionApiService.putQuestion(postValue, postValue.id).subscribe({
          next: (res: any) => {
            console.log({ res });
            this._stateService.sendEditUpdateMessage(true);
            this.isEditable = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Question Updated Successfully.',
              life: 2000,
            });
          },
        });
        this.onReset();
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Correct Answer Must be from given options',
          life: 2000,
        });
        return;
      }
    }
  }

  onReset(): void {
    this.submitted = false;
    this.questionform.reset();
    this.isEditable = false;
  }
}
