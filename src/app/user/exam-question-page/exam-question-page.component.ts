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
    const lockKey = 'exam-tab-lock';
    const currentTabId = crypto.randomUUID(); // Unique ID for this tab

    // Check if another tab is already using the exam
    const existingLock = localStorage.getItem(lockKey);

    if (existingLock && existingLock !== currentTabId) {
      // Another tab has the lock → Block access
      alert('Exam is already open in another tab. Only one tab is allowed.');
      this.router.navigate(['']); // Redirect or show message
      return;
    }

    // No other tab has it → Set lock for this tab
    localStorage.setItem(lockKey, currentTabId);
    sessionStorage.setItem(
      'examSession',
      JSON.stringify({ sessionId: currentTabId })
    );

    // Clean up on tab close
    window.addEventListener('beforeunload', () => {
      const currentLock = localStorage.getItem(lockKey);
      if (currentLock === currentTabId) {
        localStorage.removeItem(lockKey);
      }
    });
  }

  ngOnDestroy(): void {
    // this.totalTimeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    this.clearTimer();
  }

  loadQuestions() {
    this.questionsapiService.getQuestionsList().subscribe((response) => {
      this.questions = response.map((q: any) => ({
        ...q,
        questionStatus: 'untouched', // Add new key
      }));
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
    const currentQuestion = this.currentQuestion;
    if (currentQuestion.questionStatus !== 'answered') {
      currentQuestion.questionStatus = 'skipped';
      this.skipped++;
    }
    this.next();
  }

  // skip() {
  //   this.next();
  //   this.skipped = this.skipped + 1;
  //   this.startTimer();
  // }

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
