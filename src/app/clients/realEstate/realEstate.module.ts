import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { QueriesComponent } from './queries/queries.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ContentComponent } from './content/content.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RealEstateRoutingModule } from './realEstate-routing.module';
import { TenantComponent } from './tenants/tenants.component';
import { LandlordComponent } from './landlords/landlords.component';
import { BuyerComponent } from './buyers/buyers.component';
import { SellerComponent } from './sellers/sellers.component';


@NgModule({
  declarations: [
    TranscribeComponent,
    QueriesComponent,
   ContentComponent,
   SellerComponent,
   BuyerComponent,
   LandlordComponent,
   TenantComponent
  ],
  imports: [
    CommonModule,
    RealEstateRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    ControlsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class RealEstateModule { }
