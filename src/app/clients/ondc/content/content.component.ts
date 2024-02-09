import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ToastService } from '@app/services/toast';
import { SubSink } from 'subsink'
import { catchError, map, take } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { of } from 'rxjs';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private subs = new SubSink()
  submitted = false;
  files:any=[]
  modules:string[]
  transcribedResult:any
  ondcId:any;
  check:Boolean=false;
  baseURL: any = environment.Image_Base
  uploadedImages:any=[];
  productDesc:any=[]
  content:any;
  longDescription:any;
  uploadedAudio:any;
  shortDescription:any;
  formData = new FormData();
  constructor(public dataservice: DataService,
    private activerouter: ActivatedRoute,
    private toast: ToastService,
   
    ) { }

  ngOnInit(): void {
    this.activerouter.params.subscribe(params => {
      this.ondcId = params['ondcId'];
      this.getTranscriptedText();
    });
  }

  getTranscriptedText(){
      this.dataservice.callAPI("get", {},`client/ondc/content/${this.ondcId}`).pipe(
        take(1),
        map(res => {
          this.longDescription=res.data.transcribedRecord.longDescription;
          this.shortDescription=res.data.transcribedRecord.shortDescription
          this.uploadedImages=res.data.uploadedRecord.file[0].filter((file)=>file.type=="image");
          this.uploadedAudio=res.data.uploadedRecord.file[0].filter((file)=>file.type=="audio");
          this.productDesc=res.data.productDesc
        })).subscribe()
  }


  copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    this.toast.toast('Content Copied')
  }
  

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  updateResult = (data) => {
    let self = this
    self.productDesc[data.key] = data.value
    return this.dataservice.callAPI("patch", data, `client/ondc/update/${this.ondcId}`).pipe(
      take(1),
      map(res => {
        this.toast.toast(res['message'])
        return of(true)
      }),
      catchError(() => {
        return of(true)
      }))
  }
  updateONDCTypes(key, event) {
    const value = event.target.value;
    const data = { key, value: value === "true" };
  
    this.dataservice
      .callAPI("patch", data, `client/ondc/update/${this.ondcId}`)
      .pipe(take(1))
      .subscribe((res) => this.toast.toast(res ? res['message'] : 'Something went wrong!'));
  }
  
}
