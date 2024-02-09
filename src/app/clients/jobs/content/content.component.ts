import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ScrollService } from '@app/services/scroll';
import { ToastService, TYPE } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { SubSink } from 'subsink'
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';
import { environment } from '@environments/environment';
import { CurrentuserService } from '@app/services/currentuser.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private subs = new SubSink()
  editContentForm: FormGroup;
  submitted = false;
  userId: string = ''
  profilepic: any
  matchedCandidates:any=[]
  files: any = []
  modules: string[]
  transcribedResult: any
  fileId: any;
  check: Boolean = false;
  audioSrc: any;
  lang: any;
  languageEdited: any;
  fileName: string
  matchedJobs:any=[];
  newcontent: any;
  baseURL: any = environment.Image_Base
  newtranscribedResult: any = '';
  addtionalFields:any;
  subPart: any;
  messageContent: any;
  personType:any;
  availableLanguages: any = [
    { name: 'English', value: 'en' },
    { name: 'Hindi', value: 'hi' },
    { name: 'Tamil', value: 'ta' },
    { name: 'Telugu', value: 'te' },
    { name: 'Kannada', value: 'kn' },
    { name: 'Malayalam', value: 'ml' },
    { name: 'Punjabi', value: 'pa' }
  ]
  content: any;
  coinsLeft:any;
  module: any = 'Jobs'
  audio: any = { name: '', url: '' }
  formData = new FormData();
  constructor(public dataservice: DataService,
    private formBuilder: FormBuilder,
    private alert: ToastService,
    private router: Router,
    private scroll: ScrollService,
    private el: ElementRef,
    public validator: CustomValidator,
    private activerouter: ActivatedRoute,
    private toast: ToastService,
    public userService:CurrentuserService,
    private _auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.userService.coinsLeft$.subscribe((res)=>{
      this.coinsLeft = res.coinsleft
    })
    this.activerouter.params.subscribe(params => {
      this.subPart = params['subPart']
      this.fileId = params['fileId'];
      this.getTranscriptedText();
    });
    this.editContentForm = this.formBuilder.group({
      content: new FormControl("", [Validators.required]),
    })
  }

  get f() {
    return this.editContentForm.controls;
  }

  getTranscriptedText() {
    this.dataservice.callAPI("get", {}, `client/queries/getContent/${this.fileId}?module=${this.module}`).pipe(
      take(1),
      map(res => {
        this.transcribedResult = res.data.content;
         this.addtionalFields=res.data.additionalContent
        this.messageContent = this.transcribedResult?.Message
        this.content = res.data.content.content;
        this.audioSrc = this.baseURL + res.data.fileContent.url;
        this.fileName = res.data.fileContent.name;
        this.newtranscribedResult = res.data.content.editedContent || res.data.content.content;
        this.newcontent = res.data.content.editedContent || res.data.content.content;
        this.lang = res.data.content.editedLang || ''
        this.matchedCandidates=res.data.matchedCandidates
        this.matchedJobs=res.data.matchedJobs;
        this.personType=this.addtionalFields.personType
      })).subscribe()
  }
  getFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  onContentChange(event) {
    const value = (event.target.value);
    this.newcontent = value;
  }
  copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    this.toast.toast('Content Copied')
  }
  onLanguageChange(event) {
    const lang = event.target.value
    if (lang) {
      this.dataservice.callAPI("post", {}, `client/translate/${this.fileId}?module=${this.module}&lang=${lang}`).pipe(
        take(1),
        map(res => {
          this.newcontent = res.data.content.editedContent;
          this.lang = res.data.content.editedLang;
        })).subscribe()
    }
  }

  updateResult = (data) => {
    let self = this
    self.transcribedResult[data.key] = data.value
    return this.dataservice.callAPI("patch", data, `client/queries/update/${this.fileId}`).pipe(
      take(1),
      map(res => {
        this.toast.toast(res['message'])
        return of(true)
      }),
      catchError(() => {
        return of(true)
      }))
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  onSubmit() {
    this.submitted = false;
    let content = this.newcontent;
    if (content.trim() == "") {
      this.submitted = true;
      return;
    }
    let body = { content: JSON.stringify(this.newcontent) }
    this.dataservice.callAPI("post", body, `client/queries/updateContent/${this.fileId}`).pipe(
      take(1),
      map(res => {
        this.alert.toast(res['message'])
        if (this.subPart == 'transcribe') {
          this.router.navigate(["/client/jobs/transcribe"])
        } else {
          this.router.navigate(["/client/jobs/queries"])
        }

      })).subscribe()
  }
  rematchJobs(){
    if(this.coinsLeft>0){
      const body={fileId:this.fileId,alreadyUploaded:true}
      this.dataservice.callAPI("post", body,`client/jobs/transcribe/audio`).pipe(
        take(1),
        map(res => {
          this.alert.toast(res['message']);
          this.getTranscriptedText();
          this.router.navigate([`/client/jobs/audio/transcribe/${this.fileId}`])
        })).subscribe()
    }else{
      this.toast.toast('Kindly purchase more coins')
    }
  }
  rematchCandidates(){
    if(this.coinsLeft>0){
      const body={fileId:this.fileId,alreadyUploaded:true}
      this.dataservice.callAPI("post", body,`client/jobs/transcribe/audio`).pipe(
        take(1),
        map(res => {
          this.alert.toast(res['message']);
          this.getTranscriptedText();
          this.router.navigate([`/client/jobs/audio/transcribe/${this.fileId}`])
        })).subscribe()
    }else{
      this.toast.toast('Kindly purchase more coins')
    }
  }
}
