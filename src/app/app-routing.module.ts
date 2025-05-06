import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout/dashboard-layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { loginAuthGuard } from './core/login-auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  { path: 'login', component: LoginComponent },
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
  {
    path: 'user-layout',
    component: UserLayoutComponent,
    data: {
      title: 'user-layout',
    },
    children: [
      {
        path: 'register-page',
        loadChildren: () =>
          import('./user/registerpage/registerpage.module').then(
            (m) => m.RegisterpageModule
          ),
      },
      {
        path: 'exam-question-page',
        loadChildren: () =>
          import('./user/exam-question-page/exam-question-page.module').then(
            (m) => m.ExamQuestionPageModule
          ),
      },
      {
        path: 'congrats-page',
        loadChildren: () =>
          import('./user/congrats-page/congrats-page.module').then(
            (m) => m.CongratsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, CommonModule],
})
export class AppRoutingModule {}
