import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private messageSource = new Subject<Object>();
  message$ = this.messageSource.asObservable();

  // bEHAVIOUR SUBJECT TAKES EXPECTED ARGUMENT ATLEAST 1
  // private messageSource2 = new BehaviorSubject<string>('9089');
  // message2$ = this.messageSource.asObservable();

  sendMessage(message: Object) {
    this.messageSource.next(message);
  }
}
