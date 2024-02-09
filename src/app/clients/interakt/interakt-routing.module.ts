import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InteraktComponent } from './interakt.component';
const routes: Routes = [
  {
    path: "",
    component: InteraktComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteraktRoutingModule { }
