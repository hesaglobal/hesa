import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FinanceRoutingModule } from './finance-routing.module'
import { ControlsModule } from '@app/controls/controls.module';
import { QueriesComponent } from './queries/queries.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    QueriesComponent,
    TranscribeComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    PerfectScrollbarModule,
    ControlsModule,
    HighchartsChartModule,
    ReactiveFormsModule,FormsModule,
    NgbPaginationModule
  ]
})
export class FinanceModule { }

