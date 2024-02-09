import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPackageComponent } from './addpackages.component';
import {ControlsModule} from '@app/controls/controls.module'

@NgModule({
  declarations: [
    AddPackageComponent
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
export class AddPackageModule { }
