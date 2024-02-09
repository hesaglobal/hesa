import { Component, OnInit, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ScrollService } from '@app/services/scroll';
import { ToastService } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { Dates } from '@app/shared/helpers/Dates';
import { SubSink } from 'subsink'


@Component({
  selector: 'app-adddiscount',
  templateUrl: './adddiscount.component.html',
  styleUrls: ['./adddiscount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  private subs = new SubSink()
  addDiscountForm: UntypedFormGroup;
  submitted = false;
  mode: string = "Add";
  discountId: string = ''
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
        this.discountId = paramMap.get('id');
        this.getDiscountDetails(this.discountId)
      }
    })

    this.addDiscountForm = this.formBuilder.group({
      title: new UntypedFormControl("", [Validators.required]),
      discountType: new UntypedFormControl("", [Validators.required]),
      discount: new UntypedFormControl("", [Validators.required]),
      couponName: new UntypedFormControl("", [Validators.required]),
      couponCode: new UntypedFormControl("", [Validators.required]),
      limit: new UntypedFormControl(""),
      validTill: new UntypedFormControl("")
    })

  }

  get f() {
    return this.addDiscountForm.controls;
  }

  addDiscount() {
    this.submitted = true
    console.log(this.f.validTill.value)
    if (this.addDiscountForm.invalid) {
      this.getFormValidationErrors(this.addDiscountForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }

    if (this.mode == 'Add') {
      this.subs.add(this.dataservice.callAPI("post", this.addDiscountForm.value, "admin/discounts").subscribe(
       res => {
          this.alert.toast(res['message'])
          this.router.navigate(["/admin/setting/discount"])
      }))
    } else if(this.mode === 'Edit'){

      this.subs.add(this.dataservice.callAPI("put", this.addDiscountForm.value, `admin/discounts/${this.discountId}`).subscribe(
        res => {
           this.alert.toast(res['message'])
           this.router.navigate(["/admin/setting/discount"])
       }))
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

  private getDiscountDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `admin/discounts/${id}`).subscribe(res => {
      if(res.data?.discount?.validTill){
        res.data.discount.validTill = Dates.convertDate(res.data.discount.validTill)
      }
      this.addDiscountForm.patchValue(res.data.discount)
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }

}
