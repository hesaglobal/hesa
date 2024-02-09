import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnersComponent } from './winners.component';
import {RouterModule} from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { WinnersRoutingModule } from './winners-routing.module';


@NgModule({
  declarations: [
    WinnersComponent
  ],
  imports: [
    CommonModule,
    WinnersRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    RouterModule
  ]
})
export class WinnersModule { }
