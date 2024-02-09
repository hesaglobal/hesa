import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { OndcComponent } from './ondc.component';
import { OndcRoutingModule } from './ondc-routing.module';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    OndcComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    OndcRoutingModule,
    ControlsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class OndcModule { }
