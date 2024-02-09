import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { ContentComponent } from './content/content.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { OthersComponent } from './others/others.component';
import { EmployersComponent } from './employers/employers.component';
import { QueriesComponent } from './queries/queries.component';
const routes: Routes = [
  {
    path: "",
    component: TranscribeComponent,
    pathMatch: 'full',
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
    path: "employers",
    component: EmployersComponent
  },
  {
    path:'others',
    component:OthersComponent
  },
  {
    path:"candidates",
    component:CandidatesComponent
  },
  // {
  //   path:"queries",
  //   component:QueriesComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
