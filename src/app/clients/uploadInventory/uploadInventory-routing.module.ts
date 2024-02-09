import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadInventoryComponent } from './uploadInventory.component';

const routes: Routes = [
  {
    path: "",
    component: UploadInventoryComponent,
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadInventoryRoutingModule { }
