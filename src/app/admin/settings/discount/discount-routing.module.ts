import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';
import { AddDiscountComponent } from './add/adddiscount.component'

const routes: Routes = [
  {
    path: '',
    component: DiscountComponent
  },
  {
    path: 'add',
    component: AddDiscountComponent
  },
  {
    path: ':id',
    component: AddDiscountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
