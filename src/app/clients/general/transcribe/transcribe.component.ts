import { Component, OnInit, ElementRef } from '@angular/core';
import { SubSink } from 'subsink';
import { DataService } from '@app/services/data/data.service';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { map, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from '@app/services/toast';
import { CurrentuserService } from '@app/services/currentuser.service';
import { saveAs } from 'file-saver';
import { cssNumber } from 'jquery';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-transcribe',
  templateUrl: './transcribe.component.html',
  styleUrls: ['./transcribe.component.scss'],
})
export class TranscribeComponent implements OnInit {
  constructor(
    public dataServices: DataService,
    public router: Router,
    public _auth:AuthService,
    private toast:ToastService,
    public userService:CurrentuserService,
    public activatedRoute:ActivatedRoute,
    private ask: ConfirmDialogService
  ) {}
  private subs = new SubSink();
  popupAction: Subject<any> = new Subject();
  transcriptions: any[] = [];
  transribedResult: any

  imgUrl = environment.Image_Base;
  url: string;
  fileId: any;
  disabled: boolean = false;
  coinsLeft:any;
  collectionSize:any;
  mode:any='Process'
  page = 1
  pageSize = 10;
  ngOnInit(): void {
    this.userService.coinsLeft$.subscribe((res)=>{
      this.coinsLeft = res.coinsleft
    })
    this.getTarnscribedFiles(this.page);
  }

  getTarnscribedFiles(page){
    this.page = page
    this.userService.getCoinsLeft()
    this.dataServices.callAPI("get", {},`client/general?currentPage=${page}&pageSize=${this.pageSize}`).pipe(
      take(1),
      map(res => {
        this.transcriptions = res.data.transcriptions;
        this.collectionSize = res.data.count
      })).subscribe()
  }

  doneAction = () => {
    let self = this
    self.getTarnscribedFiles(this.page)
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  onProcess(fileKey,fileId){
    this.mode='Process'
    if(this.coinsLeft>0){
      this.fileId=fileId
      const body={fileKey,fileId,module:"General"}
      this.dataServices.callAPI("post", body,`client/transcribed/general`).pipe(
        take(1),
        map(res => {
          if(!res.status){
            this.toast.toast(res['message'])
          }else{
            this.getTarnscribedFiles(this.page);
          }
        })).subscribe()
    }else{
      this.toast.toast('Kindly purchase more coins')
    }
  }
  onDelete(fileId:any,fileKey:any,name:any){
    this.ask.confirmThis(`Are you sure to delete this file <b>${name}</b>`, () => {
    this.mode='Delete';
    this.fileId=fileId
    const body={fileId,fileKey,module:'General'}
    this.dataServices.callAPI("delete", body,`client/transcribed/deleteContent`).pipe(
      take(1),
      map(res => {
        this.toast.toast(res['message'])
        this.getTarnscribedFiles(this.page);
      })).subscribe()
    }, () => {
        this.toast.toast("File not deleted")
    });
  }
  onDevProcess(fileKey,fileId){
    if(this.coinsLeft>0){
      this.fileId=fileId
      const body={fileKey,fileId}
      this.dataServices.callAPI("post", body,`client/transcribed/getGeneralTranscription`).pipe(
        take(1),
        map(res => {
          this.getTarnscribedFiles(this.page);
        })).subscribe()
    }else{
      this.toast.toast('Kindly purchase more coins')
    }
  }
  copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    this.toast.toast('Content Copied')
  }
  viewFile(fileId){
      this.router.navigate(['/client/general/audio','transcribe', fileId]);
  }
  download(file) {
    saveAs(`${environment.Image_Base}${file.url}`, file.name)
  }
}
