import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentComponent } from './department.component';
import { DepartmentRoutingModule } from './department-routing.module';
import { AddDepartmentComponent } from './adddepartment/adddepartment.component';
@NgModule({
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    PerfectScrollbarModule,
    ControlsModule,
    HighchartsChartModule,
    ReactiveFormsModule,FormsModule,
    NgbPaginationModule
  ]
})
export class DepartmentModule { }

