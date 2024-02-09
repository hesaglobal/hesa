import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomersComponent } from './customers.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
@NgModule({
  declarations: [
    CustomersComponent,
    AddcustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    PerfectScrollbarModule,
    ControlsModule,
    HighchartsChartModule,
    ReactiveFormsModule,FormsModule,
    NgbPaginationModule
  ]
})
export class CustomerModule { }

