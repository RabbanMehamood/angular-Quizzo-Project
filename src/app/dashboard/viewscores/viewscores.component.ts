import { Component, OnInit, inject } from '@angular/core';
import { ViewusersService } from './services/viewusers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewscores',
  templateUrl: './viewscores.component.html',
  styleUrl: './viewscores.component.scss',
})
export class ViewscoresComponent implements OnInit {
  visible: boolean = false;

  // Table + Paginator properties
  users: any[] = [];
  first = 0;
  rows = 17;
  totalRecords = 0;
  curPageInput: number = 1;
  maxPage: number = 1;

  viewUserScoresService = inject(ViewusersService);
  router = inject(Router);
  //Search Functionality Code
  searchValue: string = '';
  getSearchValue(searchValue) {
    if (searchValue === '') {
      this.viewUserScoresService.getUsers().subscribe((res) => {
        this.users = res;

        // Calculate pagination values
        this.totalRecords = this.users.length;
        this.maxPage = Math.ceil(this.totalRecords / this.rows);

        console.log('Fetched Users:', res);
      });
    } else {
      console.log(searchValue);
      const filteredData = this.users.filter((item) =>
        item['name'].includes(searchValue)
      );
      console.log('filteredDAta', filteredData);
      this.users = filteredData;
    }
  }

  //sort Age and score functionality code
  sortAgeAesc() {
    const ageSortedUsersDataList = this.users.sort(
      (a, b) => a['age'] - b['age']
    );
    console.log(ageSortedUsersDataList);
    this.users = ageSortedUsersDataList;
  }
  sortAgeDesc() {
    const ageSortedUsersDataList = this.users.sort(
      (a, b) => b['age'] - a['age']
    );
    console.log(ageSortedUsersDataList);
    this.users = ageSortedUsersDataList;
  }
  sortScore() {
    const scoreSortedUserDataList = this.users.sort(
      (a, b) => a['score'] - b['score']
    );
    console.log(scoreSortedUserDataList);
    this.users = scoreSortedUserDataList;
  }
  sortNameA() {
    const sortAlphaAescUsers = this.users.sort((a, b) =>
      a['name'].localeCompare(b['name'])
    );

    this.users = sortAlphaAescUsers;
  }
  sortNameZ() {
    const sortAlphaAescUsers = this.users.sort((a, b) =>
      b['name'].localeCompare(a['name'])
    );

    this.users = sortAlphaAescUsers;
  }

  ngOnInit(): void {
    localStorage.setItem('currentPath', this.router.url);

    this.viewUserScoresService.getUsers().subscribe((res) => {
      this.users = res;

      // Calculate pagination values
      this.totalRecords = this.users.length;
      this.maxPage = Math.ceil(this.totalRecords / this.rows);

      console.log('Fetched Users:', res);
    });
  }

  showDialog() {
    this.visible = true;
  }

  // Paginator code check
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.maxPage = Math.ceil(this.totalRecords / this.rows);
    this.curPageInput = event.page + 1;
  }

  goToPage(table: any) {
    const targetPage = this.curPageInput;

    if (targetPage >= 1 && targetPage <= this.maxPage) {
      this.first = (targetPage - 1) * this.rows;
      table.first = this.first;

      table.paginate({
        first: this.first,
        rows: this.rows,
        page: targetPage - 1,
        pageCount: this.maxPage,
      });
    } else {
      this.showMessage('Invalid Page', 'Page does not exist', 'warn');
    }
  }

  showMessage(
    summary: string,
    detail: string,
    severity: 'success' | 'error' | 'info' | 'warn'
  ) {
    console.log(`[${severity.toUpperCase()}] ${summary}: ${detail}`);
  }
}
