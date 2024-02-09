import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiryRoutingModule } from './enquiry-routing.module';
import { EnquiryComponent } from "./enquiry.component";
import {RouterModule} from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {ControlsModule} from '@app/controls/controls.module'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EnquiryComponent],
  imports: [
    CommonModule,
    EnquiryRoutingModule,
    RouterModule,
    HighchartsChartModule,
    PerfectScrollbarModule,
    ControlsModule,
    NgbPaginationModule
  ]
})
export class EnquiryModule { }
