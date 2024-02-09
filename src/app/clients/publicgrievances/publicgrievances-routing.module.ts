import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrievancesComponent } from './grievances/grievances.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  {
    path: "",
    component: TranscribeComponent,
    pathMatch:'full'
  },
  {
    path: "transcribe",
    component: TranscribeComponent
  },
  {
    path: "audio/:subPart/:fileId",
    component: ContentComponent
  },
  {
    path: "grievances",
    component: GrievancesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicgrievancesRoutingModule { }
