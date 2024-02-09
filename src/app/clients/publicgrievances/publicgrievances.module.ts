import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { GrievancesComponent } from './grievances/grievances.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ContentComponent } from './content/content.component';
import { PublicgrievancesRoutingModule } from './publicgrievances-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TranscribeComponent,
    GrievancesComponent,
   ContentComponent
  ],
  imports: [
    CommonModule,
    PublicgrievancesRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    ControlsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class PublicgrievancesModule { }
