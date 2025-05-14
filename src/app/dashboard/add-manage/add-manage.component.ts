import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-manage',
  templateUrl: './add-manage.component.html',
  styleUrl: './add-manage.component.scss',
})
export class AddManageComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    localStorage.setItem('currentPath', `${this.router.url}`);
    let currentUrl = localStorage.getItem('currentPath');
    console.log(currentUrl);
  }
}
