import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { QueriesComponent } from './queries/queries.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ContentComponent } from './content/content.component';
import { CustomerCareRoutingModule } from './customercare-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TranscribeComponent,
    QueriesComponent,
   ContentComponent
  ],
  imports: [
    CommonModule,
    CustomerCareRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    ControlsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class CustomerCareModule { }
