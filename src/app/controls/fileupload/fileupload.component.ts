import { Component, Input, OnInit, ElementRef, forwardRef, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataService } from '@app/services/data/data.service';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileuploadComponent),
      multi: true
    }
  ]
})
export class FileuploadComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = "Select file"
  @Input() onChangeAction: any
  public displayValue: any = { name: '', url: '' }
  private _selectValue: any
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private  imgUrl:string = environment.Image_Base
  private input: any
  public showResults: boolean = false
  constructor(public dataservice: DataService, private element: ElementRef) { }

  writeValue(value: any): void {
    this.displayValue.url =  value ? this.imgUrl + value : ''
    this._selectValue = value;
  }
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      $(this.input).addClass('disabled')
    } else {
      $(this.input).removeClass('disabled')
    }
  }

  get selectValue(): any {
    return this._selectValue
  }

  set selectValue(value: any) {
    this._selectValue = value
    this._onChangeCallback(value);
    this._onTouchedCallback();
  }

  ngOnInit(): void {

    this.input = $(this.element.nativeElement).find('input')
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.ui.widget.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.fileupload.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.iframe-transport.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.fancy-fileupload.js');
    $.getScript('./assets/plugins/Drag-And-Drop/imageuploadify.min.js');
    $.getScript('./assets/js/custom-file-upload.js');
  }

  navigate(item) {
    this.selectValue = item
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectValue = event.target.files[0]
      let name = event.target.files[0].name
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.displayValue = { name, url: event.target.result }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  removeImage(){
    this.selectValue = ''
    this.displayValue.url = ''
  }
}
