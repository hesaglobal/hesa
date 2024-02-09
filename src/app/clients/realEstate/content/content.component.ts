import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ScrollService } from '@app/services/scroll';
import { ToastService, TYPE } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { SubSink } from 'subsink'
import { AuthService } from '@app/services/auth/auth.service';
import { environment } from '@environments/environment';
import { map, take,catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private subs = new SubSink()
  editContentForm: FormGroup;
  editJob:FormGroup
  submitted = false;
  userId: string = ''
  profilepic:any
  files:any=[]
  modules:string[]
  transcribedResult:any
  fileId:any;
  check:Boolean=false;
  audioSrc:any;
  lang:any;
  languageEdited:any;
  fileName:string
  newcontent:any;
  baseURL:any = environment.Image_Base
  newtranscribedResult:any='';
  subPart:any;
  department:any=[];
  staffs:any=[]
  staff:any=[];
  messageContent:any;
  availableLanguages: any = [
    { name: 'English', value: 'en' },
    { name: 'Hindi', value: 'hi' },
    { name: 'Tamil', value: 'ta' },
    { name: 'Telugu', value: 'te' },
    { name: 'Kannada', value: 'kn' },
    { name: 'Malayalam', value: 'ml' },
    { name: 'Punjabi', value: 'pa' }
  ]
  content:any;
  module:any='CustomerCare';
  departments:any=[]
  concernedStaff:any;
  audio: any = { name: '', url: '' }
  formData = new FormData();
  addtionalFields: any;
  constructor(public dataservice: DataService,
    private formBuilder: FormBuilder,
    private alert: ToastService,
    private router: Router,
    private scroll: ScrollService,
    private el: ElementRef,
    public validator: CustomValidator,
    private activerouter: ActivatedRoute,
    private toast: ToastService,
    private _auth:AuthService,
    ) { }

  ngOnInit(): void {
    this.activerouter.params.subscribe(params => {
      this.subPart=params['subPart']
      this.fileId = params['fileId'];
      this.getTranscriptedText();
    });
   
    this.editContentForm = this.formBuilder.group({
      content: new FormControl("", [Validators.required]),
    });
   
  }

  get f() {
    return this.editContentForm.controls;
  }

  getTranscriptedText(){
      this.dataservice.callAPI("get", {},`client/realestate/getContent/${this.fileId}`).pipe(
        take(1),
        map(res => {
            this.transcribedResult=res.data.content;
            this.addtionalFields=res.data.additionalContent
            this.messageContent=this.transcribedResult?.Message
            this.content=res.data.content.content;
            this.audioSrc=this.baseURL+res.data.fileContent.url;
            this.fileName=res.data.fileContent.name;
            this.newtranscribedResult=res.data.content.editedContent||res.data.content.content;
            this.newcontent=res.data.content.editedContent||res.data.content.content;
            this.lang=res.data.content.editedLang||'';
           
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
  updateResult = (data) => {
    let self = this
    self.transcribedResult[data.key] = data.value
    return this.dataservice.callAPI("patch", data, `client/realestate/update/${this.fileId}`).pipe(
      take(1),
      map(res => {
        this.toast.toast(res['message'])
        return of(true)
      }),
      catchError(() => {
        return of(true)
      }))
  }
  onContentChange(event) {
    const value=(event.target.value);
    this.newcontent=value;
  }

  copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    this.toast.toast('Content Copied')
  }
  onLanguageChange(event) {
    const lang = event.target.value
    if(lang){
      this.dataservice.callAPI("post", {},`client/realestate/translate/${this.fileId}?lang=${lang}`).pipe(
        take(1),
        map(res => {
            this.newcontent=res.data.content.editedContent;
            this.lang=res.data.content.editedLang;
    })).subscribe()
    }
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  onSubmit() {
    this.submitted=false;
    let content=this.newcontent;
    if(content.trim()==""){
      this.submitted=true;
      return;
    }
    let body={content:JSON.stringify(this.newcontent)}
    this.dataservice.callAPI("post", body, `client/realestate/updateContent/${this.fileId}`).pipe(
      take(1),
      map(res => {
        this.alert.toast(res['message'])
        if(this.subPart=='transcribe'){
          this.router.navigate(["/client/realestate/transcribe"])
        }else{
          this.router.navigate(["/client/realestate/queries"])
        }
      })).subscribe()
  }

}
