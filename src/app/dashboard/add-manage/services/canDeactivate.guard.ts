import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canExit: () => boolean | Observable<boolean>;
}
