import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdduserComponent } from './adduser.component';
import {ControlsModule} from '@app/controls/controls.module'

@NgModule({
  declarations: [
    AdduserComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule
  ]
})
export class AdduserModule { }
