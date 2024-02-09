import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ContentComponent } from './content/content.component';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
@NgModule({
  declarations: [
    TranscribeComponent,
    OrdersComponent,
   ContentComponent
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    ControlsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class CommerceModule { }
