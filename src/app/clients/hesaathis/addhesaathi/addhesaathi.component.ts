import { Component, OnInit, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, ValidationErrors, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ScrollService } from '@app/services/scroll';
import { ToastService, TYPE } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { SubSink } from 'subsink'
import { map, take } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-addhesaathi',
  templateUrl: './addhesaathi.component.html',
  styleUrls: ['./addhesaathi.component.scss']
})
export class AddHesaathiComponent implements OnInit {
  private subs = new SubSink()
  addHesaathiForm: UntypedFormGroup;
  submitted = false;
  mode: string = "Add";
  formData = new FormData();
  staffId: any;
  types: any = ['Shop', 'Individual', 'FPO', 'Farmer', 'Others'];
  page = 1
  staffVal:any=''
  staffs: any[] = [];
  pageSize = 50
  currentStaff: string = '';

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
        this.staffId = paramMap.get('id');
        this.getHesaathiDetails(this.staffId);
      }
    })
    this.addHesaathiForm = this.formBuilder.group({
      name: new UntypedFormControl("", [Validators.required]),
      mobile: new UntypedFormControl("", [Validators.required]),
      address: new UntypedFormControl("", [Validators.required]),
      type: new UntypedFormControl("", [Validators.required]),
      staff: new UntypedFormControl("",[Validators.required]),
      aadhar: new UntypedFormControl("", [Validators.required,Validators.minLength(12)]),
      gst: new UntypedFormControl(false, [Validators.required])
    })
  }

  get f() {
    return this.addHesaathiForm.controls;
  }


  addHesaathi() {
    this.submitted = true
    if (this.addHesaathiForm.invalid) {
      this.getFormValidationErrors(this.addHesaathiForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    let body = this.getFormData()
    if (this.mode == 'Add') {
      this.dataservice.callAPI("post", body, "client/hesaathi/add").pipe(
        take(1),
        map(res => {
          if(res.status){
            this.alert.toast(res['message'])
          }else{
            this.alert.errorStatus(res['message'])
          }
          this.router.navigate(["/client/hesaathi"])
        })).subscribe()
    }
  }
  searchStaff = (value:any)=>{
    let subject = new ReplaySubject(1);
    this.dataservice.callAPI("get", {}, `client/staff/searchStaff?value=${value}`).pipe(
      map(res =>{
        let staffs = res.data.list.map(staff => {
          return {
            key:staff._id,
            value: staff.name +  ' (' + staff.phoneNo + ')'
          }
        })
        res.data = staffs
        subject.next(res);
        subject.complete();
      })
      ).subscribe()
      return subject
  }

  onSubmit() {
    if (this.mode == 'Add') {
      this.addHesaathi()
    } else if (this.mode === 'Edit') {
      let body = this.getFormData()
      this.subs.add(this.dataservice.callAPI("post", body, `client/hesaathi/add`).subscribe(
        res => {
          this.alert.toast(res['message'])
          this.router.navigate(["/client/hesaathi"])
        }))
    }
  }

  getFormData() {
    let body = this.addHesaathiForm.value
    body['staff']=body['staff']?.key ? body['staff'].key : this.staffVal
    this.staffId ? body['_id']=this.staffId:'';
    return body;
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

  private getHesaathiDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `client/hesaathi/get/${id}`).subscribe(res => {
      this.addHesaathiForm.patchValue(res.hesaathi[0])
      if(res.staff){
        this.staffVal=res.staff._id
        this.currentStaff=res.staff.name +  ' (' + res.staff.phoneNo + ')'
      }
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }
}