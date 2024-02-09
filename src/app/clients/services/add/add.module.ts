import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServicesRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    AddServicesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AddServicesModule { }
