import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  setDarkMode(isDark: boolean): void{
    this.darkModeSubject.next(isDark);
    document.body.classList.toggle('dark-mode', isDark);
  }

  toggleDarkMode(): void{
    const current = this.darkModeSubject.getValue();
    this.setDarkMode(!current);
  }
}
