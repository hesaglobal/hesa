import { Component, Input, OnInit, ElementRef, forwardRef, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataService } from '@app/services/data/data.service';
import { environment } from '@environments/environment';
import { CustomValidator } from '@app/services/validator';
@Component({
  selector: 'app-upload-image',
  templateUrl: './uploadImage.component.html',
  styleUrls: ['./uploadImage.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImageComponent),
      multi: true
    }
  ]
})
export class UploadImageComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = "Select file"
  @Input() onChangeAction: any
  @Input() className: string = 'rounded-circle'
  public displayValue: any = { name: '', url: '' }
  private _selectValue: any
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private  imgUrl:string = environment.Image_Base
  private input: any
  public showResults: boolean = false
  constructor(public dataservice: DataService, private element: ElementRef,private validator:CustomValidator) { }

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
