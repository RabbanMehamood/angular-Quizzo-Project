import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewscoresComponent } from './viewscores.component';

const routes: Routes = [{ path: '', component: ViewscoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewscoresRoutingModule { }
