import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HesaathiRoutingModule } from './hesaathi-routing.module';
import { HesaathiComponent } from './hesaathi.component'
import { AddHesaathiComponent } from './addhesaathi/addhesaathi.component'

@NgModule({
  declarations: [
    HesaathiComponent,
    AddHesaathiComponent
  ],
  imports: [
    CommonModule,
    HesaathiRoutingModule,
    PerfectScrollbarModule,
    ControlsModule,
    ReactiveFormsModule,FormsModule,
    NgbPaginationModule
  ]
})
export class HesaathiModule { }

