import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentComponent } from './enrollment.component';
import { AddEnrollmentComponent } from './addenrollment/addenrollment.component';
const routes: Routes = [
  {
    path: "",
    component: EnrollmentComponent,
    pathMatch:'full'
  },
  {
    path: "add",
    component: AddEnrollmentComponent,
    pathMatch:'full'
  },
  {
    path: "edit/:id",
    component: AddEnrollmentComponent,
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
