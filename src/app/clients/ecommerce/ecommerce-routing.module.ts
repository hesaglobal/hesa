import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { ContentComponent } from './content/content.component';

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
    path: "transcribe/:fileId",
    component: ContentComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
