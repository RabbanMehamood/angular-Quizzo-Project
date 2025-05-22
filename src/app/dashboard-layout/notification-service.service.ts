import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationServiceService {
  changesObject: any = { added: [], edited: [], deleted: [] };
  private notifications = new BehaviorSubject<object>(this.changesObject);
  notificationsMessage = this.notifications.asObservable();

  constructor() {}
  sendNotifications(changes: object) {
    this.notifications.next(changes);
  }

  added(question: any) {
    this.changesObject.added.push(`Question${question.id} is Added`);
    this.notifications.next(this.changesObject);
  }
  edited(question: any) {
    this.changesObject.edited.push(`Question${question.id} is Updated`);
    this.notifications.next(this.changesObject);
  }
  deleted(questionId: any) {
    this.changesObject.deleted.push(`Question${questionId} is Deleted`);
    this.notifications.next(this.changesObject);
  }
  // subject and observable for the form status

  questionFormStatus = new Subject<boolean>();
  questionFormStatusMessage = this.questionFormStatus.asObservable();

  sendQuestionFormStatus(value: boolean) {
    this.questionFormStatus.next(value);
  }
  getQuestionFormStatus() {
    this.questionFormStatus.next(true);
  }
}
