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
  selector: 'app-addenrollment',
  templateUrl: './addenrollment.component.html',
  styleUrls: ['./addenrollment.component.scss']
})
export class AddEnrollmentComponent implements OnInit {
  private subs = new SubSink()
  addEnrollmentForm: UntypedFormGroup;
  submitted = false;
  mode: string = "Add";
  formData = new FormData();
  enrollmentId:any;
  currentCustomer:any=''
  page = 1
  hesaathis:any=[]
  pageSize = 50
  LinkedWithAdhaar:Boolean=true;
  referredBy:any;
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
        this.enrollmentId = paramMap.get('id');
        this.getEnrollmentDetails(this.enrollmentId);
      }
    })
    this.addEnrollmentForm = this.formBuilder.group({
      name: new UntypedFormControl("", [Validators.required]),
      contact: new UntypedFormControl("", [Validators.required]),
      location: new UntypedFormControl("", [Validators.required]),
      hasAdhaar: new UntypedFormControl("Yes"),
      adhaarNumber:new UntypedFormControl(""),
      age: new UntypedFormControl(""),
      constituency: new UntypedFormControl("",[Validators.required]),
      referredBy: new UntypedFormControl("")
    });
    this.toggleAdhaarType(this.LinkedWithAdhaar)
  }

  get f() {
    return this.addEnrollmentForm.controls;
  }

  addCustomer() {
    this.submitted = true
    console.log(this.addEnrollmentForm.invalid)
    if (this.addEnrollmentForm.invalid) {
      this.getFormValidationErrors(this.addEnrollmentForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    let body=this.getFormData()
    if (this.mode == 'Add') {
      this.dataservice.callAPI("post", body, "client/enrollment/add").pipe(
        take(1),
        map(res => {
          if(res.status){
            this.alert.toast(res['message'])
          }else{
            this.alert.errorStatus(res['message'])
          }
          this.router.navigate(["/client/enrollments"])
      })).subscribe()
    }
  }

  onSubmit(){
    if (this.mode == 'Add') {
      this.addCustomer()
    } else if(this.mode === 'Edit'){
      this.submitted = true
      if (this.addEnrollmentForm.invalid) {
        this.getFormValidationErrors(this.addEnrollmentForm);
        this.scroll.scrollToFirstInvalidControl(this.el)
        return;
      }
      let body=this.getFormData();

      this.subs.add(this.dataservice.callAPI("put", body, `client/enrollment/update/${this.enrollmentId}`).subscribe(
        res => {
           this.alert.toast(res['message'])
           this.router.navigate(["/client/enrollments"])
       }))
    }
  }

  getFormData() {
    let body={
      Name:this.f.name.value,
      phoneNo:this.f.contact.value,
      location:JSON.stringify(this.f.location.value),
      referredBy:this.f.referredBy.value.key ? this.f.referredBy.value.key:this.f.referredBy.value,
      hasAdhaar:this.f.hasAdhaar.value,
      adhaarNumber:this.f.adhaarNumber.value,
      age:this.f.age.value ? +this.f.age.value : 0,
      constituency:this.f.constituency.value
    }
     if(this.f.hasAdhaar.value=="No"){
      delete body['adhaarNumber'];
     } 
     return body;
  }
  toggleAdhaarType(type:Boolean){
    if(type==true){
      this.LinkedWithAdhaar=true;
      this.f.adhaarNumber.setValidators([Validators.required,Validators.minLength(12)]);
    }else{
      this.LinkedWithAdhaar=false;
      this.f.adhaarNumber.clearValidators();
    }
    this.f.adhaarNumber.updateValueAndValidity();
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

  private getEnrollmentDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `client/enrollment/${id}`).subscribe(res => {
      res.enrollment[0].hasAdhaar==="Yes" ? this.LinkedWithAdhaar=true : this.LinkedWithAdhaar=false;
      if(this.LinkedWithAdhaar==false) this.f.hasAdhaar.setValue("No")
      this.toggleAdhaarType(this.LinkedWithAdhaar)
      this.addEnrollmentForm.patchValue(res.enrollment[0]);
      this.f.name.setValue(res.enrollment[0].Name);
      this.f.contact.setValue(res.enrollment[0].phoneNo)
      if(res.referredPerson){
        this.referredBy=res?.referredPerson?._id;
        this.currentCustomer=res?.referredPerson?.name +  ' (' + res?.referredPerson?.contact + ')'
      }
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }

  viewEnrollments(){
    this.router.navigate(['/client/enrollments'])
  }
  searchCustomer = (value:any)=>{
    let subject = new ReplaySubject(1);
    this.dataservice.callAPI("get", {}, `client/enrollment/searchCustomer?value=${value}`).pipe(
      map(res =>{
        let customers = res.data.list.map(customer => {
          return {
            key:customer._id,
            value: customer.name +  ' (' + customer.contact + ')'
          }
        })
        res.data = customers
        subject.next(res);
        subject.complete();
      })
      ).subscribe()
      return subject
  }
}
