import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueriesComponent } from './queries/queries.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { ContentComponent } from './content/content.component';
import { LandlordComponent } from './landlords/landlords.component';
import { SellerComponent } from './sellers/sellers.component';
import { BuyerComponent } from './buyers/buyers.component';
import { TenantComponent } from './tenants/tenants.component';

const routes: Routes = [
  {
    path: "",
    component: TranscribeComponent,
    pathMatch:'full'
  },
  {
    path: "transcribe",
    component: TranscribeComponent
  },
  {
    path: "audio/:subPart/:fileId",
    component: ContentComponent
  },
  {
    path: "queries",
    component: QueriesComponent
  },
  {
    path: "landlords",
    component: LandlordComponent
  },
  {
    path:'sellers',
    component:SellerComponent
  },
  {
    path:"buyers",
    component:BuyerComponent
  },
  {
    path: "tenants",
    component: TenantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealEstateRoutingModule { }
