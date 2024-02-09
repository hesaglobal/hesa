import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { QueriesComponent } from './queries/queries.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsRoutingModule } from './jobs-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { OthersComponent } from './others/others.component';
import { EmployersComponent } from './employers/employers.component';
import { CandidatesComponent } from './candidates/candidates.component';
@NgModule({
  declarations: [
    TranscribeComponent,
    QueriesComponent,
    ContentComponent,
    CandidatesComponent,
    OthersComponent,
    EmployersComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    ControlsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ]
})
export class JobsModule { }
