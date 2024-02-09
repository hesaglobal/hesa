import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HesaathiComponent } from './hesaathi.component';
import { AddHesaathiComponent } from './addhesaathi/addhesaathi.component';
const routes: Routes = [
  {
    path: "",
    component: HesaathiComponent,
    pathMatch:'full'
  },
  {
    path: "add",
    component: AddHesaathiComponent,
    pathMatch:'full'
  },
  {
    path: "edit/:id",
    component: AddHesaathiComponent,
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HesaathiRoutingModule { }
