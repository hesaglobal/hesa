import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesComponent } from './packages.component';
import {RouterModule} from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PackagesRoutingModule } from './packages-routing.module';
import { AddPackageModule } from './add/addpackages.module'
import { ControlsModule } from '@app/controls/controls.module';


@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    RouterModule,
    AddPackageModule,
    ControlsModule
  ]
})
export class PackagesModule { }
