// questionGuard.service.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentDeactivate } from './canDeactivate.guard';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionFormCanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Observable<boolean> {
    return component.canExit ? component.canExit() : true;
  }
}
