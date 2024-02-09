import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OndcComponent } from './ondc.component';
import { ContentComponent } from './content/content.component';


const routes: Routes = [
  {
    path: "",
    component: OndcComponent,
    pathMatch:'full'
  },
  {
    path: ":ondcId",
    component: ContentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OndcRoutingModule { }
