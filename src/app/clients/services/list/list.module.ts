import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListServicesRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListServicesRoutingModule,
    NgbPaginationModule
  ]
})
export class ListServicesModule { }
