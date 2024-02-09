import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralRoutingModule } from './general-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TranscribeComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    ControlsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ]
})
export class GeneralModule { }
