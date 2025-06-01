import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionsapiService } from '../../dashboard/add-manage/services/questionsapi.service';
import { Router } from '@angular/router';
import { UserupdateserviceService } from '../services/userupdateservice.service';

@Component({
  selector: 'app-exam-question-page',
  templateUrl: './exam-question-page.component.html',
  styleUrls: ['./exam-question-page.component.scss'],
})
export class ExamQuestionPageComponent implements OnInit, OnDestroy {
  startTime: number = 0;
  totalTimeSpent: number = 0;
  userId: number;
  // questions array got from the api, and current index of the question, and countdown timer
  // and formatted time for the countdown timer
  questions: any[] = [];
  questionsInformation: any[] = [];
  currentIndex = 0;
  countdown: number = 0;
  formattedTime: string = '00:00';
  interval: any;
  // answered,submit, skipped properties initialising
  correctAnswers = 0;
  answered = 0;
  skipped = 0;
  score: number;
  totalScore: number;

  // SVG progress ring
  readonly radius = 54;
  readonly circumference = 2 * Math.PI * this.radius;
  strokeDashoffset: number = 0;
  checked = false;
  constructor(
    private questionsapiService: QuestionsapiService,
    private router: Router,
    private userScoreUpdateService: UserupdateserviceService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('currentPath', `${this.router.url}`);
    // this.startTime = Date.now();
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    // this.totalTimeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    this.clearTimer();
  }

  loadQuestions() {
    this.questionsapiService.getQuestionsList().subscribe((response) => {
      this.questions = response.map((q: any) => ({
        ...q,
        questionStatus: 'untouched',
        skipped: false, // Added new key value pair for question status checking
      }));
      this.questionsInformation = this.questions;
      console.log(this.questions);
      localStorage.setItem('totalQuestions', `${this.questions.length}`);
      this.startTimer();
      this.totalScore = this.questions.length * 2;
      this.userId = Number(localStorage.getItem('userId'));
      console.log(this.questions.length, this.totalScore, this.userId);
    });
  }

  startTimer() {
    this.clearTimer();
    const time = this.currentQuestion?.timerInSeconds;

    this.countdown = time;
    this.formattedTime = this.formatTime(this.countdown);
    this.updateProgressRing();

    this.interval = setInterval(() => {
      this.countdown--;
      this.formattedTime = this.formatTime(this.countdown);
      this.updateProgressRing();

      if (this.countdown <= 0) {
        this.clearTimer();
        this.autoNext();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.pad(mins)}:${this.pad(secs)}`;
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  updateProgressRing() {
    const time = this.currentQuestion?.timerInSeconds + 6;
    const percent = this.countdown / time;
    this.strokeDashoffset = this.circumference * (1 - percent);
  }

  clearTimer() {
    if (this.interval) clearInterval(this.interval);
  }


  autoNext() {
    let nextIndex = this.currentIndex + 1;
    while (
      nextIndex < this.questions.length &&
      this.questions[nextIndex].skipped === true
    ) {
      nextIndex++;
    }

    if (nextIndex < this.questions.length) {
      this.questions[this.currentIndex].timerInSeconds = 0;
      this.questionsInformation[this.currentIndex].questionStatus =
        'unAnswered';
      this.currentIndex = nextIndex;
      this.startTimer();
    } else {
      console.log('End of unskipped questions');
    }
  }

  next() {
    this.questions[this.currentIndex].timerInSeconds = this.countdown;
    let nextIndex = this.currentIndex + 1;
    while (
      nextIndex < this.questions.length &&
      this.questions[nextIndex].skipped === true
    ) {
      nextIndex++;
    }
    if (nextIndex < this.questions.length) {
      this.currentIndex = nextIndex;
      this.startTimer();
    } else {
      console.log('No more unskipped questions ahead');
    }
  }

  prev() {
    this.questions[this.currentIndex].timerInSeconds = this.countdown;
    let prevIndex = this.currentIndex - 1;
    while (prevIndex >= 0 && this.questions[prevIndex].skipped === true) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      this.currentIndex = prevIndex;
      this.startTimer();
    } else {
      console.log('No more unskipped questions behind');
    }
  }

  skip() {
    const currentQuestion = this.currentQuestion;
    this.questions[this.currentIndex].timerInSeconds = this.countdown;
    if (currentQuestion.questionStatus !== 'answered') {
      currentQuestion.questionStatus = 'unskip';
      this.questions[this.currentIndex].skipped = true;
      console.log(this.questions[this.currentIndex]);
      console.log(this.questions);
      this.skipped++;
    }
    this.next();
  }

  unskip(id) {
    this.questions[id - 1].skipped = false;
    this.questions[id - 1].questionStatus = 'untouched';
  }

  submit() {
    this.totalTimeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    this.score = this.correctAnswers * 2;
    console.log(this.answered, this.skipped, this.score, this.totalScore);
    this.userScoreUpdateService
      .updateUserScore(this.userId, this.score)
      .subscribe({
        next: (response) => {
          console.log('Update successful', response);
        },
        error: (error) => {
          console.error('Update error', error);
        },
      });
    localStorage.setItem('wrongAnswers', `${this.skipped}`);
    localStorage.setItem('score', `${this.score}`);
    localStorage.setItem('correctAnswers', `${this.correctAnswers}`);
    this.router.navigate(['user-layout/congrats-page']);
  }
  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  questionBook = [];
  selectedRadioButton(currentQuestion: any, $event: any) {
    const answer = $event.value;

    if (currentQuestion.correctAnswer === answer) {
      this.correctAnswers++;
    }

    // Mark question as answered
    currentQuestion.questionStatus = 'answered';
    this.answered++;

    console.log(this.correctAnswers, this.skipped, currentQuestion);
  }
}
