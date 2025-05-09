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
  //  total time spent on the quiz properties
  startTime: number = 0;
  totalTimeSpent: number = 0;
  userId: number;
  // questions array got from the api, and current index of the question, and countdown timer
  // and formatted time for the countdown timer
  questions: any[] = [];
  currentIndex = 1;
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
    // this.startTime = Date.now();
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    // this.totalTimeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    this.clearTimer();
  }

  loadQuestions() {
    this.questionsapiService.getQuestionsList().subscribe((response) => {
      this.questions = response;
      localStorage.setItem('totalQuestions', `${this.questions.length}`);
      this.startTimer();
      this.totalScore = this.questions.length * 2;
      this.userId = Number(localStorage.getItem('userId'));
      console.log(this.questions.length, this.totalScore, this.userId);
    });
  }

  startTimer() {
    this.clearTimer();
    const time = this.currentQuestion?.timerInSeconds || 30;
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
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.startTimer();
    } else {
      console.log('End of questions');
    }
  }

  next() {
    this.selectedRadioButton(this.currentQuestion, event);
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.startTimer();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.startTimer();
    }
  }

  skip() {
    this.next();
    this.skipped = this.skipped + 1;
    this.startTimer();
  }

  submit() {
    this.totalTimeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    this.score = this.correctAnswers * 2;

    // const answered = this.questions.filter(
    //   (q) => q.status === 'answered'
    // ).length;
    // const skipped = this.questions.filter((q) => q.status === 'skipped').length;
    // const score = this.questions.filter(
    //   (q) => q.status === 'answered' && q.selectedAnswer === q.correctAnswer
    // ).length;
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
    // Navigate and pass data (you can use a service or Router's state)
    // this.router.navigate(['user-layout/congrats-page'], {
    //   state: {
    //     total: this.questions.length,
    //     correct: this.correctAnswers,
    //     // answered,
    //     skippedones: this.skipped,
    //     // skipped,
    //     // score,
    //     score: this.score,
    //     totalscore: this.totalScore,
    //     timeSpent: this.totalTimeSpent,
    //   },
    // });
  }
  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  questionBook = [];
  selectedRadioButton(currentQuestion, $event) {
    const answer = $event.value;
    if (currentQuestion.correctAnswer === answer) {
      this.correctAnswers = this.correctAnswers + 1;
      this.answered = this.answered + 1;
      // this.questionBook[currentQuestion.id] = {
      //   isCorrect: true,
      //   // isSkipped: false,
      // };
    } else if (currentQuestion.correctAnswer !== answer) {
      this.skipped = this.skipped + 1;
    }
    $event.value = '';
    console.log(this.correctAnswers, this.skipped);
    // console.log({ questionBook: this.questionBook });
    // console.log(this.questionBook[currentQuestion.id]['isSkipped']);
  }
}
