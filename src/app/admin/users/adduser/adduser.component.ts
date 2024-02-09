import { Component, OnInit, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ScrollService } from '@app/services/scroll';
import { ToastService, TYPE } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { SubSink } from 'subsink'
import { Location } from '@app/models/location'
import { map, take } from 'rxjs/operators';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  private subs = new SubSink()
  addUserForm: UntypedFormGroup;
  pwGroup: UntypedFormGroup
  submitted = false;
  mode: string = "Add";
  userId: string = ''
  profilepic:any
  modules:string[]
  pic: any = { name: '', url: '' }
  formData = new FormData();
  schoolLocations: string[] = ['school']
  ageGroups: any[] = [];
  userChildren: any[] = [];
  module:any=[{name:"Dashboard",id:"Dashboard"},{name:"Upload Inventory",id:"uploadInventory"}]
  gender:any=[{name:"Male"},{name:"Female"},{name:"Others"}];
  imgUrl = environment.Image_Base
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
        this.userId = paramMap.get('id');
        this.getUserDetails(this.userId)
      }
    })



    this.pwGroup = this.formBuilder.group({
      password: new UntypedFormControl("", [Validators.required, Validators.minLength(6)]),
      confirmpassword: new UntypedFormControl("", [Validators.required, Validators.minLength(6)])
    }, { validators: [this.passwordMatcher()] })

    this.addUserForm = this.formBuilder.group({
      name: new UntypedFormControl("", [Validators.required, this.validator.noWhitespaceValidator]),
      gstin: new UntypedFormControl("", [
        Validators.required,
        this.validator.noWhitespaceValidator,
        Validators.pattern(/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|26|27|28|29|30|31|32|33|34|35|36|37|38|97|99)[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/),
        Validators.minLength(15)
      ]),
      invoiceaddress: new UntypedFormControl("", [Validators.required]),
      qr: new UntypedFormControl("", [Validators.required]),
      phoneNo: new UntypedFormControl("", [Validators.required]),
      email: new UntypedFormControl("", [Validators.required, Validators.email]),
      gender: new UntypedFormControl(""),
      location: new UntypedFormControl(""),
      logo: new UntypedFormControl(""),
      pic: new UntypedFormControl(""),
      displayName:new UntypedFormControl("",[Validators.required]),
      modules:new UntypedFormControl("",[Validators.required]),
      allocateCoins:new UntypedFormControl(0),
      pwGroup: this.pwGroup
    })

  }

  get f() {
    return this.addUserForm.controls;
  }


  addUser() {
    this.submitted = true
    if (this.addUserForm.invalid) {
      this.getFormValidationErrors(this.addUserForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    this.setFormData()
    if (this.mode == 'Add') {
      this.dataservice.callAPI("post", this.formData, "admin/users/add").pipe(
        take(1),
        map(res => {
          this.alert.toast(res['message'])
          this.router.navigate(["/admin/users"])
      })).subscribe()
    }
  }

  onSubmit(){
    if (this.mode == 'Add') {
      this.addUser()
    } else if(this.mode === 'Edit'){
      this.pwGroup.get('password').clearValidators();
      this.pwGroup.get('confirmpassword').clearValidators();
      this.pwGroup.get('password').updateValueAndValidity();
      this.pwGroup.get('confirmpassword').updateValueAndValidity();
      this.submitted = true
      if (this.addUserForm.invalid) {
        this.getFormValidationErrors(this.addUserForm);
        this.scroll.scrollToFirstInvalidControl(this.el)
        return;
      }
      let data = this.addUserForm.getRawValue();
      delete data.pwGroup
      for (var key in data) {
        console.log(`${key} ${data[key]} `);
        if (typeof data[key] == 'object') {
          data[key] = JSON.stringify(data[key])
        }
        this.formData.set(key, data[key]);
      }
      if (this.f.pic.value && this.f.pic.value.name) {
        this.formData.append('pic', this.f.pic.value, this.f.pic.value.name);
      }else{
        this.formData.set('pic', data['pic'])
      }
   
      if (this.f.logo.value && this.f.logo.value.name) {
        this.formData.append('logo', this.f.logo.value, this.f.logo.value.name);
      }else{
        this.formData.set('logo', data['logo'])
      }

      if (this.f.qr.value && this.f.qr.value.name) {
        this.formData.append('qr', this.f.qr.value, this.f.qr.value.name);
      }else{
        this.formData.set('qr', data['qr'])
      }

      this.subs.add(this.dataservice.callAPI("put", this.formData, `admin/users/edit/${this.userId}`).subscribe(
        res => {
           this.alert.toast(res['message'])
           this.router.navigate(["/admin/users"])
       }))
    }
  }

  setFormData() {
    let data = this.addUserForm.value;
    data['password']=data.pwGroup.password
    delete data.pwGroup;
    for (var key in data) {
      console.log(`${key} ${data[key]} `);
      if (typeof data[key] == 'object') {
        data[key] = JSON.stringify(data[key])
      }
      this.formData.set(key, data[key]);
    }
    if (this.f.pic.value && this.f.pic.value.name) {
      this.formData.append('pic', this.f.pic.value, this.f.pic.value.name);
    }

    if (this.f.logo.value && this.f.logo.value.name) {
      this.formData.append('logo', this.f.logo.value, this.f.logo.value.name);
    }

    if (this.f.qr.value && this.f.qr.value.name) {
      this.formData.append('qr', this.f.qr.value, this.f.qr.value.name);
    }
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

  private getUserDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `admin/users/get/${id}`).subscribe(res => {
      this.addUserForm.patchValue(res.data)
      this.modules=res.data.modules
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }



}
