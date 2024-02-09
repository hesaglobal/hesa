import { Component, Input, OnInit, ElementRef, forwardRef, EventEmitter, Output, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataService } from '@app/services/data/data.service';
import { environment } from '@environments/environment';
import { CustomValidator } from '@app/services/validator';
import * as JSZip from 'jszip';
import { ToastService } from '@app/services/toast';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
@Component({
  selector: 'app-multifileupload',
  templateUrl: './multiFileUpload.component.html',
  styleUrls: ['./multiFileUpload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiFileUploadComponent),
      multi: true
    }
  ]
})
export class MultiFileUploadComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = "Select folder"
  @Input() onChangeAction: any;
  hidePreLoader:Boolean=true;
  process:Boolean=false;
  @Input() className: string = 'rounded-circle'
  @Output() sendZipFile = new EventEmitter<any>();
  public displayValue: any = { name: '', url: '' }
  private _selectValue: any;
  private subs = new SubSink();
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private  imgUrl:string = environment.Image_Base
  private input: any
  formData = new FormData();
  public showResults: boolean = false;
  constructor(public dataservice: DataService,public router: Router, private dataServices: DataService,   private toast:ToastService,private element: ElementRef,private validator:CustomValidator) {

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

  }

  navigate(item) {
    this.selectValue = item
  }

  onFileChange(event: any) {
    this.hidePreLoader=false;
    const folderInput = event.target;
    const folderFiles = folderInput.files;
    if (folderFiles && folderFiles.length > 0) {
      const zip = new JSZip();
      const rootFolderName = 'folder';
      this.zipFolderContents(folderFiles, rootFolderName, zip).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          this.hidePreLoader=true
          this.formData.append('zipFile', content, 'folder.zip');
          this.uploadFile();
        });
      });
    }
  }

  async zipFolderContents(files: any, folderPath: string, zip: JSZip): Promise<void> {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === '') {
        const subFolderName = folderPath + '/' + file.name;
        await this.zipDirectoryContents(file, subFolderName, zip);
      } else {
        const fileReader = new FileReader();
        await new Promise<void>((resolve) => {
          fileReader.onload = () => {
            zip.file(folderPath + '/' + file.name, fileReader.result);
            resolve();
          };
          fileReader.readAsArrayBuffer(file);
        });
      }
    }
  }

  async zipDirectoryContents(directory: any, folderPath: string, zip: JSZip): Promise<void> {
    const entries = await this.readEntriesAsync(directory);
    await this.zipFolderContents(entries, folderPath, zip);
  }
  private readEntriesAsync(directory: any): Promise<any[]> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const entries: any[] = [];
        const lines = (<string>reader.result).split('\n');
        for (let i = 0; i < lines.length; i++) {
          entries.push(lines[i]);
        }
        resolve(entries);
      };
      reader.readAsText(directory);
    });
  }

  uploadFile(){
    this.hidePreLoader=false;
    // event.preventDefault();
    this.subs.sink =this.dataServices.callAPI("post", this.formData, `client/inventory/upload`).subscribe(res => {
      if(res.status){
        this.hidePreLoader=true;
        this.toast.toast(res['message']);
        this.process=true;
      }else{
        this.toast.toast(res['message'])
      }
    })
  }
  onProcess(event){
    event.preventDefault();
    this.subs.sink = this.dataServices.callAPI("get", {}, `client/inventory/process`).subscribe(res => {
         if(res.status){
          this.toast.toast(res['message'])
          this.router.navigate(["/client/inventory/items"])
         }
    })
  }
}
