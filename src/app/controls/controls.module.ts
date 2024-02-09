import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { PopoverComponent } from './popover/popover.component';
import { ImagepopoverComponent } from './imagepopover/imagepopover.component';
import { DateformatPipe } from './pipes/dateformat.pipe';
import { NgbdateformatPipe } from './pipes/ngbdateformat.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './location/location.component';
import { SearchComponent } from './search/search.component';
import { CountrymultiselectComponent } from './countrymultiselect/countrymultiselect.component';
import { DaterangeComponent } from './daterange/daterange.component'
import { SearchcomboComponent } from './searchcombo/search.component';
import { LocationOldComponent } from './locationOld/location.component';
import { UploadImageComponent } from './uploadImage/uploadImage.component';
import { PopupComponent } from './popup/popup.component';
import { VideopopoverComponent } from './videopopover/videopopover.component';
import { CalendarComponent } from './calendar/calendar.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { FilterComponent } from './filter/filter.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { UploadAudioComponent } from './uploadAudio/uploadAudio.component';
import { ModalComponent } from './modal/modal.component';
import { UploadpopoverComponent } from './uploadpopover/uploadpopover.component'
import { NgApexchartsModule } from "ng-apexcharts"
import { BarchartComponent } from './barchart/barchart.component';
import { RadialchartComponent } from './radialchart/radialchart.component';
import { SaveeditComponent } from './saveedit/saveedit.component'
import { InlineeditComponent } from './inlineedit/inlineedit.component'
import { FileTypePipe } from './pipes/filetype.pipe';
import { LinechartComponent } from './linechart/linechart.component';
import { SearchNewComponent } from './searchNew/search.component';
import { SpeechToText } from './speechtotext/speechtotext.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { MultiImageUploadComponent } from './multiImageUpload/multiImageUpload.component';
import { EditControlComponent } from './controledit/editcontrol.component';
import { MultiFileUploadComponent } from './multiFileUpload/multiFileUpload.component';


@NgModule({
  declarations: [
    MultiselectComponent,
    DateformatPipe,
    NgbdateformatPipe,
    SafePipe,
    PopoverComponent,
    ImagepopoverComponent,
    LocationComponent,
    SearchComponent,
    ModalComponent,
    CountrymultiselectComponent,
    DaterangeComponent,
    SearchcomboComponent,
    LocationOldComponent,
    SearchNewComponent,
    FileTypePipe,
    UploadImageComponent,
    EditControlComponent,
    UploadAudioComponent,
    PopupComponent,
    UploadpopoverComponent,
    VideopopoverComponent,
    MultiFileUploadComponent,
    CalendarComponent,
    QrcodeComponent,
    SpeechToText,
    MultiImageUploadComponent,
    FilterComponent,
    MapComponent,
    BarchartComponent,
    RadialchartComponent,
    SaveeditComponent,
    InlineeditComponent,
    LinechartComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBcwNTfmtaSN1hc6Ur-mUyq8peFJd2C9xU',
      libraries: ['places']
    }),
  ],
  exports: [
    MultiselectComponent,
    DateformatPipe,
    NgbdateformatPipe,
    SafePipe,
    PopoverComponent,
    ImagepopoverComponent,
    EditControlComponent,
    LocationComponent,
    SearchNewComponent,
    SearchComponent,
    FileTypePipe,
    CountrymultiselectComponent,
    SpeechToText,
    DaterangeComponent,
    MultiFileUploadComponent,
    MultiImageUploadComponent,
    SearchcomboComponent,
    ModalComponent,
    UploadAudioComponent,
    LocationOldComponent,
    UploadpopoverComponent,
    UploadImageComponent,
    PopupComponent,
    VideopopoverComponent,
    CalendarComponent,
    QrcodeComponent,
    FilterComponent,
    MapComponent,
    BarchartComponent,
    RadialchartComponent,
    InlineeditComponent,
    LinechartComponent,
    PreloaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlsModule { }
