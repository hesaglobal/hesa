import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadMessageComponent } from './uploadmessage/uploadmessage.component';

const routes: Routes = [
  {
    path: "",
    component: UploadMessageComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
