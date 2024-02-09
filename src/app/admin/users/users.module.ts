import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import {RouterModule} from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { UsersRoutingModule } from './users-routing.module';
import { AdduserModule } from './adduser/adduser.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlsModule } from '@app/controls/controls.module';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    RouterModule,
    AdduserModule,
    NgbPaginationModule,
    ControlsModule
  ]
})
export class UsersModule { }
