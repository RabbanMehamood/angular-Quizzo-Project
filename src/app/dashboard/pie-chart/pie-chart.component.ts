import { Component, OnInit, inject } from '@angular/core';
import { ViewusersService } from '../viewscores/services/viewusers.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../../dashboard-layout/notification-service.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  plugins = [ChartDataLabels];
  data: any;
  options: any;
  users: any = [];
  darkModeService = inject(NotificationServiceService);
  viewUserScoresService = inject(ViewusersService);
  router = inject(Router);
  usersLength: number;
  barLabelColor: string = '#000000';

  categories = [
    'Excellent (90–100%)',
    'Good (70–89%)',
    'Average (50–69%)',
    'Poor (<50%)',
    'Fail (<35%)',
  ];

  // Initialize counts to zero
  categoryCounts = [0, 0, 0, 0, 0];
  categoryUsers: Record<string, string[]> = {
    'Excellent (90–100%)': [],
    'Good (70–89%)': [],
    'Average (50–69%)': [],
    'Poor (<50%)': [],
    'Fail (<35%)': [],
  };

  ngOnInit() {
    localStorage.setItem('currentPath', `${this.router.url}`);

    this.viewUserScoresService.getUsers().subscribe((res) => {
      this.users = res;
      this.usersLength = res.length;
      this.populateChartData(this.users);
      this.setData();
    });

    // Dark mode subscription to update label colors dynamically
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.barLabelColor = isDarkMode ? '#ffffff' : '#000000';
      this.setData(); // Refresh chart options with updated colors
    });
  }

  populateChartData(userdata: any[]) {
    this.categoryCounts = [0, 0, 0, 0, 0];
    this.categoryUsers = {
      'Excellent (90–100%)': [],
      'Good (70–89%)': [],
      'Average (50–69%)': [],
      'Poor (<50%)': [],
      'Fail (<35%)': [],
    };

    for (const user of userdata) {
      const { name, score } = user;

      if (score >= 90) {
        this.categoryCounts[0]++;
        this.categoryUsers[this.categories[0]].push(name);
      } else if (score >= 70) {
        this.categoryCounts[1]++;
        this.categoryUsers[this.categories[1]].push(name);
      } else if (score >= 50) {
        this.categoryCounts[2]++;
        this.categoryUsers[this.categories[2]].push(name);
      } else if (score >= 35) {
        this.categoryCounts[3]++;
        this.categoryUsers[this.categories[3]].push(name);
      } else if (score >= 0) {
        this.categoryCounts[4]++;
        this.categoryUsers[this.categories[4]].push(name);
      }
    }
  }

  setData() {
    const documentStyle = getComputedStyle(document.documentElement);

    const backgroundColors = [
      documentStyle.getPropertyValue('--blue-800'),
      documentStyle.getPropertyValue('--orange-500'),
      documentStyle.getPropertyValue('--teal-500'),
      documentStyle.getPropertyValue('--violet-500'),
      documentStyle.getPropertyValue('--lime-500'),
    ];

    const hoverBackgroundColors = [
      documentStyle.getPropertyValue('--blue-400'),
      documentStyle.getPropertyValue('--orange-400'),
      documentStyle.getPropertyValue('--teal-400'),
      documentStyle.getPropertyValue('--violet-500'),
      documentStyle.getPropertyValue('--lime-500'),
    ];

    // Filter out categories with zero counts
    const filteredCategories: string[] = [];
    const filteredCounts: number[] = [];
    const filteredBackgroundColors: string[] = [];
    const filteredHoverColors: string[] = [];

    for (let i = 0; i < this.categories.length; i++) {
      if (this.categoryCounts[i] > 0) {
        filteredCategories.push(this.categories[i]);
        filteredCounts.push(this.categoryCounts[i]);
        filteredBackgroundColors.push(backgroundColors[i]);
        filteredHoverColors.push(hoverBackgroundColors[i]);
      }
    }

    this.data = {
      labels: filteredCategories,
      datasets: [
        {
          data: filteredCounts,
          backgroundColor: filteredBackgroundColors,
          hoverBackgroundColor: filteredHoverColors,
        },
      ],
    };

    this.options = {
      cutout: '50%',
      plugins: {
        datalabels: {
          color: '#ffffff',
          font: {
            weight: 'bold',
            size: 14,
          },
          formatter: (value: number) => value,
          anchor: 'center',
          align: 'center',
        },
        tooltip: {
          position: 'nearest',
          xAlign: 'bottom',
          yAligh: 'right',
          caretSize: 12,
          caretPadding: 10,
          backgroundColor: '#ffffff',
          titleColor: '#000000',
          bodyColor: 'black',
          borderColor: '#aaa',
          borderWidth: 1,
          bodyFont: {
            color: 'white',
            size: 13,
            weight: 'normal',
          },
          cornerRadius: 8,
          padding: 15,
          callbacks: {
            label: (context: any) => {
              const label = context.label;
              const users = this.categoryUsers[label] || [];
              return [...users];
            },
          },
        },
        legend: {
          position: 'bottom',
          labels: {
            color: this.barLabelColor,
          },
        },
        title: {
          display: true,
          text: 'Score Distribution',
          color: this.barLabelColor,
        },
      },
    };
  }
}
