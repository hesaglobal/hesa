import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './packages.component';
import { AddPackageComponent } from './add/addpackages.component'

const routes: Routes = [
  {
    path: '',
    component: PackagesComponent
  },
  {
    path: 'add',
    component: AddPackageComponent
  },
  {
    path: ':id',
    component: AddPackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
