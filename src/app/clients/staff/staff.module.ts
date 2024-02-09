import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { AddstaffComponent } from './addstaff/addstaff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    StaffComponent,
    AddstaffComponent,
    
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    ReactiveFormsModule,
    ControlsModule,
    CommonModule,
  ],
  providers:[
    DatePipe
  ]
})
export class StaffModule { }
