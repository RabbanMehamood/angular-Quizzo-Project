import { Component, OnInit, inject } from '@angular/core';
import { ViewusersService } from './services/viewusers.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewscores',
  templateUrl: './viewscores.component.html',
  styleUrl: './viewscores.component.scss',
})
export class ViewscoresComponent implements OnInit {
  // dialog box properties, methods
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  // table properties and methods
  users: any[] = [];

  // instance using inject method, calling in ngonit when ever components gets called using lazy loading and loaded.
  viewUserScoresService = inject(ViewusersService);
  router = inject(Router);

  ngOnInit(): void {
    localStorage.setItem('currentPath', `${this.router.url}`);

    this.viewUserScoresService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(res);
    });
  }
}
