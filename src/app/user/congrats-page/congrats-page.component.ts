import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congrats-page',
  templateUrl: './congrats-page.component.html',
  styleUrl: './congrats-page.component.scss',
})
export class CongratsPageComponent implements OnInit {
  wrongAnswers: number;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  totalScore: number;
  router = inject(Router);
  ngOnInit(): void {
    localStorage.setItem('currentPath', `${this.router.url}`);
    this.totalQuestions = parseInt(localStorage.getItem('totalQuestions'));
    this.correctAnswers = parseInt(localStorage.getItem('correctAnswers'));
    this.score = parseInt(localStorage.getItem('score'));
    this.wrongAnswers = this.totalQuestions - this.correctAnswers;
    this.totalScore = this.totalQuestions * 2;
  }
}
