import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ControlsModule } from '@app/controls/controls.module';
import { UploadMessageComponent } from './uploadmessage/uploadmessage.component';
import { ViewRoutingModule } from './view-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    UploadMessageComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    ReactiveFormsModule,
    ControlsModule,
    FormsModule,
    NgbModule
  ]
})
export class ViewModule { }
