import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongratsPageComponent } from './congrats-page.component';

const routes: Routes = [{ path: '', component: CongratsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongratsPageRoutingModule { }
