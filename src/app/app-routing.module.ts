import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout/dashboard-layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { loginAuthGuard } from './core/login-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'auth',
    canActivate: [loginAuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    data: {
      title: 'dashboard',
    },
    children: [
      {
        path: '',

        redirectTo: 'add-manage',
        pathMatch: 'full',
      },
      {
        path: 'add-manage',
        loadChildren: () =>
          import('./dashboard/add-manage/add-manage.module').then(
            (m) => m.AddManageModule
          ),
      },
      {
        path: 'view-scores',
        loadChildren: () =>
          import('./dashboard/viewscores/viewscores.module').then(
            (m) => m.ViewscoresModule
          ),
      },
      {
        path: 'bar-chart',
        loadChildren: () =>
          import('./dashboard/bar-chart/bar-chart.module').then(
            (m) => m.BarChartModule
          ),
      },
      {
        path: 'pie-chart',
        loadChildren: () =>
          import('./dashboard/pie-chart/pie-chart.module').then(
            (m) => m.PieChartModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
