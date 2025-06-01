import { Component, OnInit, inject } from '@angular/core';
import { ViewusersService } from '../viewscores/services/viewusers.service';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../../dashboard-layout/notification-service.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit {
  data: any;
  label = [];
  userscorelist = [];
  options: any;
  users: any[] = [];

  // instance using inject method, calling in ngonit when ever components gets called using lazy loading and loaded.
  viewUserScoresService = inject(ViewusersService);
  router = inject(Router);

  //CHARTLABEL IN DARK MODE SUBSCRIPTION
  darkModeService = inject(NotificationServiceService);
  barLabelColor: string = '#000000';

  ngOnInit() {
    localStorage.setItem('currentPath', `${this.router.url}`);
    this.viewUserScoresService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(res);
      this.label = this.users.map((user) => user.name);
      this.userscorelist = this.users.map((user) => user.score);
      console.log({ label: this.label, userscorelist: this.userscorelist });
      this.setData();
    });
    //darkMode subscription
    this.darkModeService.isDarkMode$.subscribe((booleanVal) => {
      console.log('chartLabelDarkValue', booleanVal);
      if (booleanVal) {
        this.barLabelColor = '#ffffff';
        this.setData();
      } else {
        this.barLabelColor = '#000000';
        this.setData();
      }
    });
  }

  setData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: this.label,
      datasets: [
        {
          label: 'Users scores dataset',
          backgroundColor: documentStyle.getPropertyValue('--barcolor-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          color: '#000000',
          data: this.userscorelist,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: this.barLabelColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: this.barLabelColor,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            color: surfaceBorder,
            drawBorder: true,
          },
        },
        y: {
          ticks: {
            color: this.barLabelColor,
          },
          grid: {
            display: false,
          },
        },
      },
    };
  }
}
