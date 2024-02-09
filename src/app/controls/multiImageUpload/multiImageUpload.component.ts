import { Component, Input, OnInit, ElementRef, forwardRef, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataService } from '@app/services/data/data.service';
import { environment } from '@environments/environment';
import { CustomValidator } from '@app/services/validator';
@Component({
  selector: 'app-multiimageupload',
  templateUrl: './multiImageUpload.component.html',
  styleUrls: ['./multiImageUpload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiImageUploadComponent),
      multi: true
    }
  ]
})
export class MultiImageUploadComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = "Select file"
  @Input() onChangeAction: any;
  @Input() maxLimit: any
  @Input() shouldReset:Boolean=false;
  files: any = [];
  errorMsg:any='Only Image can be uploaded!'
  hasError:Boolean=false
  @Input() className: string = 'rounded-circle'
  public displayValue: any = { name: '', url: '' }
  private _selectValue: any
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private  imgUrl:string = environment.Image_Base
  private input: any
  public showResults: boolean = false
  constructor(public dataservice: DataService, private element: ElementRef,private validator:CustomValidator) {

   }

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
    this.input = $(this.element.nativeElement).find('input');
    if(this.shouldReset){
      this.selectValue='';
      this.files=[]
    }
  }

  navigate(item) {
    this.selectValue = item
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.hasError=false;
      let validImages=this.validator.validImages(event.target.files);
      this.selectValue = event.target.files;
      var reader = new FileReader();
      var filesAmount = event.target.files.length;
      if(filesAmount>this.maxLimit){
        this.errorMsg='Only 5 images can be uploaded';
        this.files=[]
        this.hasError=true;
         return;
      }
      if(!validImages){
        this.errorMsg='Only images can be uploaded in format png,jpeg or jpg';
        this.files=[]
        this.hasError=true;
        return;
      }
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          let name = event.target.files[i].name
          reader.onload = (event: any) => {
            this.files.push({
              name,
              url: event.target.result,
            });
          };
          reader.readAsDataURL(event.target.files[i]);
        }
     
    }
  }
  removeImage(index){
    this.selectValue = this.files.splice(index,1)
  }
}
