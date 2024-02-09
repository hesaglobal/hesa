import { Component, Input, OnInit, ElementRef, forwardRef, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomValidator } from '@app/services/validator';
@Component({
  selector: 'app-upload-audio',
  templateUrl: './uploadAudio.component.html',
  styleUrls: ['./uploadAudio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadAudioComponent),
      multi: true
    }
  ]
})
export class UploadAudioComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = "Select file"
  @Input() maxLimit: number
  @Input() allowedDuration:number
  private _selectValue: any
  public hasError: Boolean = false;
  files: any = [];
  accept: any;
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private input: any
  public errorMsg = ''
  
  constructor(private element: ElementRef, private validator: CustomValidator) { }

  writeValue(value: any): void {
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
    if (this.maxLimit && this.maxLimit > 1) {
      this.accept = "audio/*,video/*"
      this.placeholder = "Upload Audio"
    } else {
      this.accept = "audio/*,video/*,image/*"
      this.placeholder = "Upload Audio or Image"
    }
    this.input = $(this.element.nativeElement).find('input')
  }

  onFileChange(event: any) {
    let self = this
    let audioDuration;
    if (event.target.files) {
      this.hasError = false;
      if (event.target.files.length > this.maxLimit) {
        this.hasError = true;
        this.errorMsg = `Only ${this.maxLimit} files can be uploaded.`
      }
      this.selectValue = event.target.files;
      var reader = new FileReader();
      var filesAmount = event.target.files.length;
     
      // let name = event.srcElement.name;
      if(this.allowedDuration&&this.allowedDuration>0){
        var audio = document.createElement('audio');
        audio.preload = 'metadata';
        audio.onloadedmetadata = function() {
        window.URL.revokeObjectURL(audio.src);
        audioDuration=audio.duration;
        if(audioDuration>this.allowedDuration){
          this.hasError=true;
          this.errorMsg="Audio more than 5 minutes cannot be uploaded.";
          this.selectValue='';
          return;
        }
      }.bind(this)
      audio.src = URL.createObjectURL(new Blob(event.target.files, {type: "application/zip"}));
      }
      let audioValidation = this.maxLimit > 1 ? this.validator.audioOnly(event.target.files) : this.validator.validFiles(event.target.files);
      if (audioValidation == false) {
        this.hasError = true
        this.errorMsg = this.maxLimit > 1 ? 'Only audio files less than 4mb can be uploaded' : 'Only audio,video and image file less than 4mb can be uploaded'
        this.selectValue = '';
        return;
      }

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.files.push({
            url: event.target.result,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
