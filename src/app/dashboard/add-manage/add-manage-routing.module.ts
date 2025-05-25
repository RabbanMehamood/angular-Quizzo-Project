import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManageComponent } from './add-manage.component';
import { QuestionFormCanDeactivateGuard } from './services/questionGuard.service';


const routes: Routes = [
  {
    path: '',
    component: AddManageComponent,
    canDeactivate: [QuestionFormCanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddManageRoutingModule {}
