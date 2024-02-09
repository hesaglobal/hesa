import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, UntypedFormControl, ValidatorFn, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { ActivatedRoute , ParamMap, Router} from '@angular/router';
import { ToastService } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { DatePipe } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScrollService } from '@app/services/scroll';
@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.scss']
})
export class AddstaffComponent implements OnInit {

  private subs = new SubSink()
  mode : string = 'Add'
  addStaffForm : FormGroup
  submitted : boolean = false;
  pwGroup: UntypedFormGroup
  staffId : string 
  currentDepartment: string = '';
  departments:string[];
  department:any=[{}]
  constructor(
    public dataservice : DataService,
    private formBuilder : FormBuilder,
    private activerouter : ActivatedRoute,
    private alert : ToastService,
    private router : Router,
    public validator: CustomValidator,
    private datePipe: DatePipe,
    private scroll: ScrollService,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.activerouter.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = "Edit";
        this.staffId = paramMap.get('id');
        this.getStaffDetails(this.staffId);
      }
    })
    this.getDepartments();
    
    this.pwGroup = this.formBuilder.group({
      password: new UntypedFormControl("", [Validators.required, Validators.minLength(6)]),
      confirmpassword: new UntypedFormControl("", [Validators.required, Validators.minLength(6)])
    }, { validators: [this.passwordMatcher()] })

    this.addStaffForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      phoneNo: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")]),
      designation: new FormControl("",[Validators.required]),
      joiningDate: new FormControl(""),
      department:new FormControl("",[Validators.required]),
      pwGroup: this.pwGroup
    });
  }

  onSubmit(){
    if (this.mode == 'Add') {
      this.addStaff()
    } else if(this.mode === 'Edit'){
      this.updateStaff()
    }
  }
  getDepartments(){
    this.subs.sink = this.dataservice.callAPI("get", {}, `client/department`).subscribe(res => {
      if (res.data.departments) {
        this.department = res.data.departments.map((item)=>{return {id:item._id,name:item.name}})
      }
    })
  }
  passwordMatcher(): ValidatorFn {
    return (control: UntypedFormGroup) => {
      if (control) {
        const { value: password } = control.get('password')
        const { value: confirmpassword } = control.get('confirmpassword')
        if (password === confirmpassword) {
          return null
        } else {
          return { passwordNotMatch: true }
        }
      }

      return null
    }
  }
  addStaff(){
    this.submitted = true;
    if (this.addStaffForm.invalid) {
      return;
    }
    let body=this.addStaffForm.getRawValue()
    body['password']=this.addStaffForm.value.pwGroup.password;
    delete body['pwGroup']
    if (this.mode == 'Add') {
      this.subs.add(this.dataservice.callAPI("post", body, "client/staff/add").subscribe(res=>{
        if(res.status){
          this.alert.toast(res.message)
        }else{
          this.alert.errorStatus(res.message)
        }
        this.router.navigate(['/client/staff'])
      }))
    }
  }
  
  viewStaff(){
    this.router.navigate(['/client/staff'])
  }
  get f(){
    return this.addStaffForm.controls
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
  getStaffDetails(id){
      this.subs.add(this.dataservice.callAPI("get", {}, `client/staff/${id}`).subscribe(res => {
        this.addStaffForm.patchValue(res.data)
        // this.currentDepartment=res.data.department.name
        if(res.data.joiningDate){
          let date=new Date(res.data.joiningDate).toISOString().split('T')[0];
          this.f.joiningDate.setValue(date);
        }
        this.departments=res.data.department;
      }, (error: any) => {
        this.router.navigate(['/admin/error/error-404'])
      }))
  }
  updateStaff(){
    this.pwGroup.get('password').clearValidators();
    this.pwGroup.get('confirmpassword').clearValidators();
    this.pwGroup.get('password').updateValueAndValidity();
    this.pwGroup.get('confirmpassword').updateValueAndValidity();
    if (this.addStaffForm.invalid) {
      this.getFormValidationErrors(this.addStaffForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    let body=this.addStaffForm.getRawValue();
    if(!body['joiningDate']){
      delete body['joiningDate']
    }
    this.subs.add(this.dataservice.callAPI("put", body, `client/staff/updateStaff/${this.staffId}`).subscribe(res=>{
      if(res.status){
        this.alert.toast(res.message)
      }else{
        this.alert.errorStatus(res.message)
      }  
      this.router.navigate(['/client/staff'])
    }))
  }

}
