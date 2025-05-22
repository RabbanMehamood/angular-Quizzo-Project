import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionFormComponent } from '../components/question-form/question-form.component';

export interface IDeactivateComponent{
  canExit: () => boolean | Observable<boolean> | Promise<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionGuardService
  implements CanDeactivate<IDeactivateComponent>
{
  router: Router = inject(Router);

  constructor() {}
  canDeactivate(
    component: IDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return component.canExit();
  }
}
