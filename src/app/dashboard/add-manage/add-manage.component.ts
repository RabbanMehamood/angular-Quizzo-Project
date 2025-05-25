import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { CanComponentDeactivate } from './services/canDeactivate.guard';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-manage',
  templateUrl: './add-manage.component.html',
  styleUrl: './add-manage.component.scss',
})
export class AddManageComponent implements OnInit, CanComponentDeactivate {
  @ViewChild(QuestionFormComponent)
  questionFormComponent!: QuestionFormComponent;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('currentPath', `${this.router.url}`);
    let currentUrl = localStorage.getItem('currentPath');
    console.log(currentUrl);
  }

  canExit(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (
        this.questionFormComponent &&
        this.questionFormComponent.questionform.dirty &&
        !this.questionFormComponent.submitted
      ) {
        this.confirmationService.confirm({
          key: 'confirmInProgressForm',
          message: 'You have unsaved changes. Are you sure you want to leave?',
          header: 'Confirm Navigation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            observer.next(true);
            observer.complete();
          },
          reject: () => {
            observer.next(false);
            observer.complete();
          },
        });
      } else {
        observer.next(true);
        observer.complete();
      }
    });
  }
}
