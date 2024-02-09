import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueriesComponent } from './queries/queries.component';
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
    path: "queries",
    component: QueriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerCareRoutingModule { }
