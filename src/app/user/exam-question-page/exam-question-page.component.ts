import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-exam-question-page',
  templateUrl: './exam-question-page.component.html',
  styleUrl: './exam-question-page.component.scss',
})
export class ExamQuestionPageComponent {
  options: string[] = ['Toronto', 'Mancouver', 'Ottawa', 'Montoreal'];
}
