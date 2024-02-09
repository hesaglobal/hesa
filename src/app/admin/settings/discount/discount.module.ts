import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountComponent } from './discount.component';
import {RouterModule} from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DiscountRoutingModule } from './discount-routing.module';
import { AddDiscountModule } from './add/adddiscount.module'
import { ControlsModule } from '@app/controls/controls.module';


@NgModule({
  declarations: [
    DiscountComponent
  ],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    RouterModule,
    AddDiscountModule,
    ControlsModule
  ]
})
export class DiscountModule { }
