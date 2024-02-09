import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EnrollmentComponent } from './enrollment.component';
import { AddEnrollmentComponent } from './addenrollment/addenrollment.component';
import { EnrollmentRoutingModule } from './enrollment-routing.module';
@NgModule({
  declarations: [
    EnrollmentComponent,
    AddEnrollmentComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    PerfectScrollbarModule,
    ControlsModule,
    HighchartsChartModule,
    ReactiveFormsModule,FormsModule,
    NgbPaginationModule
  ]
})
export class EnrollmentModule { }

