import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InteraktComponent } from './interakt.component';
import { InteraktRoutingModule } from './interakt-routing.module';

@NgModule({
  declarations: [
    InteraktComponent
  ],
  imports: [
    CommonModule,
    InteraktRoutingModule,
    PerfectScrollbarModule,
    ControlsModule,
    ReactiveFormsModule,FormsModule,
    NgbPaginationModule
  ]
})
export class InteraktModule { }

