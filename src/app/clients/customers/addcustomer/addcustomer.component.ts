import { Component, OnInit, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ScrollService } from '@app/services/scroll';
import { ToastService, TYPE } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { SubSink } from 'subsink'
import { map, take } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.scss']
})
export class AddcustomerComponent implements OnInit {
  private subs = new SubSink()
  addCustomerForm: UntypedFormGroup;
  submitted = false;
  mode: string = "Add";
  LinkedWithGST:Boolean=true;
  formData = new FormData();
  customerId:any;
  currentHesaathi:any=''
  types:any=['Shop','Individual','FPO','Farmer','Others'];
  GSTTypes:any=["Registered - Regular GST","Registered - Comp. Scheme"]
  page = 1
  hesaathis:any=[]
  pageSize = 50
  LinkedWithHesaathi:Boolean=true;
  subcategories:any;
  hesaathiVal:any=''
 
  customers:any;
  constructor(public dataservice: DataService,
    private formBuilder: UntypedFormBuilder,
    private alert: ToastService,
    private router: Router,
    private scroll: ScrollService,
    private el: ElementRef,
    public validator: CustomValidator,
    private activerouter: ActivatedRoute,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.subs.sink = this.activerouter.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = "Edit";
        this.customerId = paramMap.get('id');
        this.getCustomerDetails(this.customerId);
      }
    })
    this.addCustomerForm = this.formBuilder.group({
      name: new UntypedFormControl("", [Validators.required]),
      contact: new UntypedFormControl("", [Validators.required]),
      location: new UntypedFormControl("", [Validators.required]),
      hesaathiLinking: new UntypedFormControl("Yes",[Validators.required]),
      hesaathi:new UntypedFormControl("",[Validators.required]),
      type: new UntypedFormControl("",[Validators.required]),
      GSTTreatment: new UntypedFormControl("Yes",[Validators.required]),
      GSTTreatmentType: new UntypedFormControl("",[Validators.required]),
      GSTIN: new UntypedFormControl("",[Validators.required,Validators.minLength(15),Validators.pattern(/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|26|27|28|29|30|31|32|33|34|35|36|37|38|97|99)[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/), this.validator.noWhitespaceValidator])
    })
  }

  get f() {
    return this.addCustomerForm.controls;
  }

  addCustomer() {
    this.submitted = true
    if (this.addCustomerForm.invalid) {
      this.getFormValidationErrors(this.addCustomerForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    let body=this.getFormData()
    if (this.mode == 'Add') {
      this.dataservice.callAPI("post", body, "client/customers/add").pipe(
        take(1),
        map(res => {
          if(res.status){
            this.alert.toast(res['message'])
          }else{
            this.alert.errorStatus(res['message'])
          }
          this.router.navigate(["/client/customers"])
      })).subscribe()
    }
  }

  onSubmit(){
    if (this.mode == 'Add') {
      this.addCustomer()
    } else if(this.mode === 'Edit'){
      this.submitted = true
      if (this.addCustomerForm.invalid) {
        this.getFormValidationErrors(this.addCustomerForm);
        this.scroll.scrollToFirstInvalidControl(this.el)
        return;
      }
      let body=this.getFormData();

      this.subs.add(this.dataservice.callAPI("put", body, `client/customers/update/${this.customerId}`).subscribe(
        res => {
           this.alert.toast(res['message'])
           this.router.navigate(["/client/customers"])
       }))
    }
  }

  getFormData() {
    let body={
      name:this.f.name.value,
      contact:this.f.contact.value,
      location:JSON.stringify(this.f.location.value),
      hesaathiLinking:this.f.hesaathiLinking.value,
      hesaathi:this.f.hesaathi.value?.key? this.f.hesaathi.value?.key :this.hesaathiVal,
      type:this.f.type.value,
      GSTTreatment:this.f.GSTTreatment.value,
      GSTTreatmentType:this.f.GSTTreatmentType.value,
      GSTIN:this.f.GSTIN.value
     }
     console.log(this.LinkedWithGST,'gstLinkinh',this.f.GSTIN.value);
     this.LinkedWithHesaathi ? body : delete body['hesaathi'] 
     if(!this.LinkedWithGST){
      delete body['GSTTreatmentType'];
      delete body['GSTIN'];
     }
     return body;
  }
  toggleGSTType(type:Boolean){
    if(type==true){
      this.LinkedWithGST=true;
      this.f.GSTTreatmentType.setValidators([Validators.required]);
      this.f.GSTIN.setValidators([Validators.required]);
    }else{
      this.LinkedWithGST=false;
      this.f.GSTTreatmentType.clearValidators();
      this.f.GSTIN.clearValidators();
    }
    this.f.GSTTreatmentType.updateValueAndValidity();
    this.f.GSTIN.updateValueAndValidity();
  }
  getFormValidationErrors(form: UntypedFormGroup) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  toggleHesaathiType(linking:Boolean){
    if(linking==true){
      this.LinkedWithHesaathi=true;
      this.f.hesaathi.setValidators([Validators.required]);
    }else{
      this.LinkedWithHesaathi=false;
      this.f.hesaathi.clearValidators();
    }
    this.f.hesaathi.updateValueAndValidity();
  }
  

  private getCustomerDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `client/customers/${id}`).subscribe(res => {
      res.customer[0].hesaathi? this.LinkedWithHesaathi=true : this.LinkedWithHesaathi=false
      this.addCustomerForm.patchValue(res.customer[0]);
      if(res.customer[0].GSTTreatment.toLowerCase()==="no"){
        this.LinkedWithGST=false;
      }
      if(res.hesaathi){
        this.hesaathiVal=res?.hesaathi?._id;
        this.currentHesaathi=res?.hesaathi?.name +  ' (' + res?.hesaathi?.mobile + ')'
      }
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }

  viewCustomers(){
    this.router.navigate(['/client/customers'])
  }
  searchHesaathi = (value:any)=>{
    let subject = new ReplaySubject(1);
    this.dataservice.callAPI("get", {}, `client/hesaathi/searchHesaathi?value=${value}`).pipe(
      map(res =>{
        let hesaathis = res.data.list.map(hesaathi => {
          return {
            key:hesaathi._id,
            value: hesaathi.name +  ' (' + hesaathi.mobile + ')'
          }
        })
        res.data = hesaathis
        subject.next(res);
        subject.complete();
      })
      ).subscribe()
      return subject
  }



}
