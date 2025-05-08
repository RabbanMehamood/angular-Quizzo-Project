import { Component, OnInit, inject } from '@angular/core';
import { ViewusersService } from '../viewscores/services/viewusers.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  users: any = [
    { name: 'Megha', score: 75 },
    { name: 'Raj', score: 80 },
    { name: 'Aditi', score: 78 },
    { name: 'Priya', score: 92 },
    { name: 'Ravi', score: 45 },
    { name: 'Alok', score: 60 },
    { name: 'Sneha', score: 95 },
    { name: 'Deepak', score: 67 },
    { name: 'Anjali', score: 38 },
  ];
  // instance using inject method, calling in ngonit when ever components gets called using lazy loading and loaded.
  viewUserScoresService = inject(ViewusersService);
  categories = [
    'Excellent (90–100%)',
    'Good (70–89%)',
    'Average (50–69%)',
    'Poor (<50%)',
  ];
  categoryCounts = [90, 70, 50, 40];
  categoryUsers: Record<string, string[]> = {
    'Excellent (90–100%)': [],
    'Good (70–89%)': [],
    'Average (50–69%)': [],
    'Poor (<50%)': [],
  };

  populateChartData() {
    for (const user of this.users) {
      const { name, score } = user;
      console.log({ name });

      if (score >= 90) {
        this.categoryCounts[0]++;
        this.categoryUsers[this.categories[0]].push(name);
      } else if (score >= 70) {
        this.categoryCounts[1]++;
        this.categoryUsers[this.categories[1]].push(name);
      } else if (score >= 50) {
        this.categoryCounts[2]++;
        this.categoryUsers[this.categories[2]].push(name);
      } else {
        this.categoryCounts[3]++;
        this.categoryUsers[this.categories[3]].push(name);
      }
    }
  }

  ngOnInit() {
    this.viewUserScoresService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(res);
      this.label = this.users.map((user) => user.name);
      this.userscorelist = this.users.map((user) => user.score);
      console.log({ label: this.label, userscorelist: this.userscorelist });
      this.setData();
      this.populateChartData();
    });
  }
  setData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    // const counts = this.getCategoryCounts([
    //   95, 88, 76, 45, 82, 67, 91, 59, 73, 30, 99, 65,
    // ]);

    this.data = {
      labels: this.categories,
      datasets: [
        {
          data: this.categoryCounts,
          // backgroundColor: [
          //   documentStyle.getPropertyValue('--blue-800'),
          //   documentStyle.getPropertyValue('--yellow-500'),
          //   documentStyle.getPropertyValue('--green-500'),
          // ],
          // hoverBackgroundColor: [
          //   documentStyle.getPropertyValue('--blue-400'),
          //   documentStyle.getPropertyValue('--yellow-400'),
          //   documentStyle.getPropertyValue('--green-400'),
          // ],
        },
      ],
    };

    this.options = {
      cutout: '40%', // Donut size
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label;
              console.log({ label });

              const users = this.categoryUsers[label] || [];
              return [`Users:`, ...users];
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

  // getCategoryCounts(scores: number[]): number[] {
  //   const counts = [0, 0, 0, 0]; // Excellent, Good, Average, Poor

  //   for (const score of scores) {
  //     if (score >= 90) counts[0]++;
  //     else if (score >= 70) counts[1]++;
  //     else if (score >= 50) counts[2]++;
  //     else counts[3]++;
  //   }

  //   return counts;
  // }
}
