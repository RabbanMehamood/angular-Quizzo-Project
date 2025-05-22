import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManageComponent } from './add-manage.component';
import { QuestionGuardService } from './services/questionGuard.service';
QuestionGuardService;

const routes: Routes = [
  {
    path: '',
    component: AddManageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddManageRoutingModule {}
