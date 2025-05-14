import { Component, OnInit, inject } from '@angular/core';
import { ViewusersService } from '../viewscores/services/viewusers.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  plugins = [ChartDataLabels]; // Pass this to <p-chart>
  data: any;
  label = [];
  userscorelist = [];
  options: any;
  // users: any[] = [];
  users: any = [];
  // instance using inject method, calling in ngonit when ever components gets called using lazy loading and loaded.
  viewUserScoresService = inject(ViewusersService);
  categories = [
    'Excellent (90–100%)',
    'Good (70–89%)',
    'Average (50–69%)',
    'Poor (<50%)',
    'Fail (<35%)',
  ];
  categoryCounts = [90, 70, 50, 40, 30];
  categoryUsers: Record<string, string[]> = {
    'Excellent (90–100%)': [],
    'Good (70–89%)': [],
    'Average (50–69%)': [],
    'Poor (<50%)': [],
    'Fail (<35%)': [],
  };

  populateChartData(userdata: any[]) {
    for (const user of userdata) {
      const { name, score } = user;
      // console.log({ name });

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
      // } else if (score <= 34) {
      //
      // }
    }
    console.log(this.categoryCounts, this.categoryUsers);
  }
  router = inject(Router);
  ngOnInit() {
    localStorage.setItem('currentPath', `${this.router.url}`);
    this.viewUserScoresService.getUsers().subscribe((res) => {
      this.users = res;

      this.setData();
      this.populateChartData(this.users);
      // console.log({ label: this.label, userscorelist: this.userscorelist });

      // console.log(res);
      this.label = this.users.map((user) => user.name);
    });
  }
  setData() {
    const documentStyle = getComputedStyle(document.documentElement);
    documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.categories,
      datasets: [
        {
          data: this.categoryCounts,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-800'),
            documentStyle.getPropertyValue('--orange-500'),
            documentStyle.getPropertyValue('--teal-500'),
            documentStyle.getPropertyValue('--violet-500'),
            documentStyle.getPropertyValue('--lime-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--orange-400'),
            documentStyle.getPropertyValue('--teal-400'),
            documentStyle.getPropertyValue('--violet-500'),
            documentStyle.getPropertyValue('--lime-500'),
          ],
        },
      ],
    };

    this.options = {
      cutout: '50%', // Donut size
      plugins: {
        tooltip: {
          backgroundColor: '#eefeff', // Tooltip background (dark gray)
          titleColor: '#000000', // Title text color (e.g., "Excellent (90–100%)")
          bodyColor: '#333333',
          borderColor: '#aaa', // Optional: border around tooltip
          borderWidth: 1,
          bodyFont: {
            size: 13,
            weight: 'normal',
          },
          cornerRadius: 8,
          padding: 15,
          callbacks: {
            label: (context: any) => {
              const label = context.label;
              console.log({ label });

              const users = this.categoryUsers[label] || [];
              return [...users];
            },
          },
        },
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Score Distribution',
        },
      },
    };
  }
}
