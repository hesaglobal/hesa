import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './adddepartment/adddepartment.component';
import { DepartmentComponent } from './department.component';
const routes: Routes = [
  {
    path: "",
    component: DepartmentComponent,
    pathMatch:'full'
  },
  {
    path: "add",
    component: AddDepartmentComponent,
    pathMatch:'full'
  },
  {
    path: "edit/:id",
    component: AddDepartmentComponent,
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
