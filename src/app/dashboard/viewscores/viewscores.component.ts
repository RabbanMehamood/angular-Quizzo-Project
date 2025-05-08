import { Component, OnInit, inject } from '@angular/core';
import { ViewusersService } from './services/viewusers.service';
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

  ngOnInit(): void {
    this.viewUserScoresService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(res);
    });
  }
}
