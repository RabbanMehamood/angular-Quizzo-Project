import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wildcard',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './wildcard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WildcardComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    const currentUrlPath = localStorage.getItem('currentPath');
    this.router.navigate([currentUrlPath]);
  }
}
