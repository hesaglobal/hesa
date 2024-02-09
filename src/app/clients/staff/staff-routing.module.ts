import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { AddstaffComponent } from './addstaff/addstaff.component';

const routes: Routes = [
  {
    path: "",
    component: StaffComponent,
    pathMatch:'full'
  },
  {
    path: "add",
    component : AddstaffComponent
  },
  {
    path: "edit/:id",
    component: AddstaffComponent,
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
