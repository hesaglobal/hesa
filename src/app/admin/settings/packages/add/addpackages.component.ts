import { Component, OnInit, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ScrollService } from '@app/services/scroll';
import { ToastService } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { SubSink } from 'subsink'


@Component({
  selector: 'app-addpackages',
  templateUrl: './addpackages.component.html',
  styleUrls: ['./addpackages.component.scss']
})
export class AddPackageComponent implements OnInit {
  private subs = new SubSink()
  addPackageForm: UntypedFormGroup;
  submitted = false;
  mode: string = "Add";
  packageId: string = ''
  formData = new FormData();

  constructor(public dataservice: DataService,
    private formBuilder: UntypedFormBuilder,
    private alert: ToastService,
    private router: Router,
    private scroll: ScrollService,
    private el: ElementRef,
    public vaidator: CustomValidator,
    private activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs.sink = this.activerouter.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = "Edit"
        this.packageId = paramMap.get('id');
        this.getPackageDetails(this.packageId)
      }
    })

    this.addPackageForm = this.formBuilder.group({
      title: new UntypedFormControl("", [Validators.required]),
      coins: new UntypedFormControl("", [Validators.required]),
      amount: new UntypedFormControl("", [Validators.required]),
      dateRange: new UntypedFormControl({fromDate:'', toDate: ''}, [Validators.required])
    })

  }

  get f() {
    return this.addPackageForm.controls;
  }

  addPackage() {
    this.submitted = true

    if (this.addPackageForm.invalid) {
      this.getFormValidationErrors(this.addPackageForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }

    this.setFormData()


    if (this.mode == 'Add') {
      this.subs.add(this.dataservice.callAPI("post", this.addPackageForm.value, "admin/packages").subscribe(
       res => {
          this.alert.toast(res['message'])
          this.router.navigate(["/admin/setting/package"])
      }))
    } else if(this.mode === 'Edit'){

      this.subs.add(this.dataservice.callAPI("put", this.addPackageForm.value, `admin/packages/${this.packageId}`).subscribe(
        res => {
           this.alert.toast(res['message'])
           this.router.navigate(["/admin/setting/package"])
       }))
    }
  }

  formatNGBDate(date){
    return typeof date === 'object' ? date.year+'-' + date.month+'-'+ date.day : date
  }

  setFormData() {
    let data = this.addPackageForm.getRawValue();
    data.dateRange.fromDate = this.formatNGBDate(data.dateRange.fromDate)
    data.dateRange.toDate = this.formatNGBDate(data.dateRange.toDate)
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

  private getPackageDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `admin/packages/${id}`).subscribe(res => {
          this.addPackageForm.patchValue(res.data.package)
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }

}
