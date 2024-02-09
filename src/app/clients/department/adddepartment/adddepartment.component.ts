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
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['./adddepartment.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  private subs = new SubSink()
  addDepartmentForm: UntypedFormGroup;
  submitted = false;
  departmentId:any;
  mode: string = "Add";
  formData = new FormData();
  page = 1
  pageSize = 50
  departments:any;
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
        this.departmentId = paramMap.get('id');
        this.getDepartmentDetails(this.departmentId);
      }
    })
    this.addDepartmentForm = this.formBuilder.group({
      name: new UntypedFormControl("", [Validators.required])
    })
  }

  get f() {
    return this.addDepartmentForm.controls;
  }

  addDepartment() {
    this.submitted = true
    if (this.addDepartmentForm.invalid) {
      this.getFormValidationErrors(this.addDepartmentForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    let body=this.getFormData()
    if (this.mode == 'Add') {
      this.dataservice.callAPI("post", body, "client/department/add").pipe(
        take(1),
        map(res => {
          if(res.status){
            this.alert.toast(res['message'])
          }else{
            this.alert.errorStatus(res['message'])
          }
          this.router.navigate(["/client/departments"])
      })).subscribe()
    }
  }

  onSubmit(){
    if (this.mode == 'Add') {
      this.addDepartment()
    } else if(this.mode === 'Edit'){
      let body=this.getFormData();
      this.subs.add(this.dataservice.callAPI("put", body, `client/department/update/${this.departmentId}`).subscribe(
        res => {
          if(res.status){
            this.alert.toast(res['message'])
          }else{
            this.alert.errorStatus(res['message'])
          }
          this.router.navigate(["/client/departments"])
       }))
    }
  }

  getFormData() {
    let body={
      name:this.f.name.value
     }
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

  private getDepartmentDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `client/department/${id}`).subscribe(res => {
      this.addDepartmentForm.patchValue(res.data);
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }

  viewDepartments(){
    this.router.navigate(['/client/departments'])
  }
}
