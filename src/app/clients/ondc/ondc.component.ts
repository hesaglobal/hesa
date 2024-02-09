import { Component, OnInit,  } from '@angular/core';
import { SubSink } from 'subsink';
import { DataService } from '@app/services/data/data.service';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { map, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from '@app/services/toast';
import { CurrentuserService } from '@app/services/currentuser.service';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ondc',
  templateUrl: './ondc.component.html',
  styleUrls: ['./ondc.component.scss'],
})
export class OndcComponent implements OnInit {
  constructor(
    public dataServices: DataService,
    public router: Router,
    public _auth:AuthService,
    private toast:ToastService,
    public userService:CurrentuserService,
    public activatedRoute:ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private ask: ConfirmDialogService,
  ) {}
  private subs = new SubSink();
  popupAction: Subject<any> = new Subject();
  transcriptions: any[] = [];
  customClass:'custom-class'
  transribedResult: any
  ONDCForm: UntypedFormGroup;
  hidePreLoader:Boolean=true;
  imgUrl = environment.Image_Base;
  url: string;
  mode:any='Process'
  fileId: any;
  disabled: boolean = false;
  coinsLeft:any;
  collectionSize:any;
  shouldReset:Boolean=false;
  page = 1
  pageSize = 10;
  maxLimit:any=5
  formData = new FormData();
  ngOnInit(): void {
    this.ONDCForm = this.formBuilder.group({
      audio: new UntypedFormControl("", []),
      images:new UntypedFormControl("",[])
    });
    this.userService.coinsLeft$.subscribe((res)=>{
      this.coinsLeft = res.coinsleft
    })
    this.getTarnscribedFiles(this.page);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  uploadAudio(audioData:FormData){
   this.formData.append('audio',audioData.get('audio'))
  }
  setFormData() {
    if (this.f.images.value.length > 0) {
      for (let i = 0; i < this.f.images.value.length; i++) {
        this.formData.append("file", this.f.images.value[i], this.f.images.value[i].fileName);
      }
    }
  }
  get f() {
    return this.ONDCForm.controls;
  }

  onSubmit(){
   this.setFormData();
   this.hidePreLoader=false;
   this.dataServices.callAPI("post", this.formData,`client/ondc/upload`).pipe(
    take(1),
    map(res => {
      this.hidePreLoader=true;
      if(res.status&&res['message']){
        this.toast.toast(res['message']);
        this.clearingFiles();
        this.getTarnscribedFiles(this.page);
      }else{
        this.toast.errorStatus(res['message'])
      }
    })).subscribe();
  }
  getTarnscribedFiles(page){
    this.page = page
    this.userService.getCoinsLeft()
    this.dataServices.callAPI("get", {},`client/ondc?currentPage=${page}&pageSize=${this.pageSize}`).pipe(
      take(1),
      map(res => {
        this.transcriptions = res.data.transcriptions;
        this.collectionSize = res.data.count
      })).subscribe()
  }
  onProcess(ondcId){
    this.mode='Process';
    this.fileId=ondcId;
    // if(this.coinsLeft>0){
      this.dataServices.callAPI("post", {},`client/ondc/transcribeContent/${ondcId}`).pipe(
        take(1),
        map(res => {
          if(res){
            this.getTarnscribedFiles(this.page);
          }
        })).subscribe();
    // }else{
    //   this.toast.toast('Kindly purchase more coins')
    // }
  }
  onDelete(ondcId){
    this.ask.confirmThis(`Are you sure to delete this file?`, () => {
      this.dataServices.callAPI("delete",{},`client/ondc/delete/${ondcId}`).pipe(
        take(1),
        map(res => {
          this.toast.toast(res['message'])
          this.getTarnscribedFiles(this.page);
        })).subscribe()
    }, () => {
      this.toast.toast("File not deleted")
    });
  }
  viewFile(ondcId){
    this.router.navigate(['/client/ondc', ondcId]);
  }
  clearingFiles() {
    this.formData = new FormData();
    this.f.images.setValue('');
    this.f.audio.setValue('');
  }
}
