import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadInventoryRoutingModule } from './uploadInventory-routing.module';
import { UploadInventoryComponent } from './uploadInventory.component';

@NgModule({
  declarations: [
    UploadInventoryComponent
  ],
  imports: [
    CommonModule,
    UploadInventoryRoutingModule,
    PerfectScrollbarModule,
    ControlsModule,
    ReactiveFormsModule,FormsModule,
    NgbPaginationModule
  ]
})
export class UploadInventoryModule { }
