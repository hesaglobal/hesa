import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
const routes: Routes = [
  {
    path: "",
    component: CustomersComponent,
    pathMatch:'full'
  },
  {
    path: "add",
    component: AddcustomerComponent,
    pathMatch:'full'
  },
  {
    path: "edit/:id",
    component: AddcustomerComponent,
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
