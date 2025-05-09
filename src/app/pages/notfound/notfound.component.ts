import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  template: `<p>Not Found Route</p>`,
  styleUrl: './notfound.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent {}
