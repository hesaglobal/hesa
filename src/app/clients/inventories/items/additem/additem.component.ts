import { Component, OnInit, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ScrollService } from '@app/services/scroll';
import { ToastService, TYPE } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { SubSink } from 'subsink'
import { map, take } from 'rxjs/operators';


@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AddItemComponent implements OnInit {
  private subs = new SubSink()
  addItemForm: UntypedFormGroup;
  submitted = false;
  mode: string = "Add";
  desiredMultipleFields:any=[]
  formData = new FormData();
  public isdisplayPriceGreater: Boolean = false;
  itemId: any;
  units: any = ["kg", "g", "l", "ml", "m", "cm", "pieces"];
  page = 1
  pageSize = 50
  subcategories: any;
  categories: any;
  EANCode: any;
  HSNCode: any;
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
        this.itemId = paramMap.get('id');
        this.getItemDetails(this.itemId);
      }
    })
    this.addItemForm = this.formBuilder.group({
      name: new UntypedFormControl("", [Validators.required]),
      category: new UntypedFormControl("", [Validators.required]),
      subCategory: new UntypedFormControl("",[Validators.required] ),
      description: new UntypedFormControl(""),
      units: new UntypedFormControl(""),
      salePrice: new UntypedFormControl(""),
      displayPrice: new UntypedFormControl("" ),
      productId: new UntypedFormControl("", [Validators.required]),
      purchasePrice: new UntypedFormControl(""),
      HSNCode: new UntypedFormControl(""),
      GSTRate: new UntypedFormControl(""),
      manufacturerName:  new UntypedFormControl(""),
      manufacturerAddress:  new UntypedFormControl(""),
      commonNameofCommodity:  new UntypedFormControl(""),
      manufacturedate:  new UntypedFormControl(""),
      importedCountry:  new UntypedFormControl(""),
      isVegetarian:  new UntypedFormControl(false),
      ingredients:  new UntypedFormControl(""),
      brandOwnerName:  new UntypedFormControl("", ),
      brandOwnerAddress:  new UntypedFormControl(""),
      brandOwnerFSSAILicenseNo:  new UntypedFormControl(""),
      otherFSSAILicenseNo:  new UntypedFormControl(""),
      importerName:  new UntypedFormControl(""),
      importerAddress:  new UntypedFormControl(""),
      importerFSSAILicenseNo:  new UntypedFormControl(""),
      importedCountryofOrigin:  new UntypedFormControl(""),
      otherImporterName:  new UntypedFormControl(""),
      otherImporterAddress:  new UntypedFormControl(""),
      otherPremises:  new UntypedFormControl(""),
      otherImporterCountryofOrigin:  new UntypedFormControl(""),
      IsSellingPriceExclusiveofGST:  new UntypedFormControl(""),
      SGSTTaxRate:  new UntypedFormControl(""),
      CGSTTaxRate:  new UntypedFormControl(""),
      IGSTTaxRate:  new UntypedFormControl(""),
      UnitDenomination:  new UntypedFormControl(""),
      Returnable:  new UntypedFormControl(false),
      ReturnWindow:  new UntypedFormControl(""),
      SellerPickupReturn:  new UntypedFormControl(false),
      Cancellable:   new UntypedFormControl(false),
      CODAvailability:  new UntypedFormControl(false),
      TimetoShip:  new UntypedFormControl(""),
      MaxSaleQuantity:  new UntypedFormControl(""),
      MinSaleQuantity:  new UntypedFormControl(""),
      UnitValue:new UntypedFormControl(""),
      bestbefore:new UntypedFormControl(""),
      countryOfOrigin:new UntypedFormControl(""),
      Quantity:new UntypedFormControl(""),
      pricepergram:new UntypedFormControl(""),
      Weight:new UntypedFormControl(""),
      brandName:new UntypedFormControl(""),
      EANCode:new UntypedFormControl(""),
      maxRetailPrice:new UntypedFormControl(0,[Validators.required]),
      packSize:new UntypedFormControl(""),
      marketedBy:new UntypedFormControl(""),
      marketedAddress:new UntypedFormControl(""),
      complaintorfeedback:new UntypedFormControl(""),
    })
    this.getCategories();
    this.getSubCategories();
  }

  get f() {
    return this.addItemForm.controls;
  }
  addingEANCode(event){
    let value=event.target.value;
    if(value.trim()!==""){
      this.EANCode=value;
      this.f.EANCode.setValidators([Validators.required,Validators.minLength(13)]);
      this.f.EANCode.updateValueAndValidity();
    }else{
      this.f.EANCode.clearValidators();
    }
  }
  addingHSNCode(event){
    let value=event.target.value;
    if(value.trim()!==""){
      this.HSNCode=value;
      this.f.HSNCode.setValidators([Validators.required,Validators.minLength(8)]);
      this.f.HSNCode.updateValueAndValidity();
    }else{
      this.f.HSNCode.clearValidators();
    }
  }
  addItem() {
    this.submitted = true
    this.isdisplayPriceGreater = false
    if (this.addItemForm.invalid) {
      this.getFormValidationErrors(this.addItemForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    let displayPrice = this.f.displayPrice.value;
    let salePrice = this.f.salePrice.value;
    if (parseFloat(displayPrice) > parseFloat(salePrice)) {
      this.isdisplayPriceGreater = true;
      return;
    }
    let body = this.getFormData()
    if (this.mode == 'Add') {
      this.dataservice.callAPI("post", body, "client/inventory/items/add").pipe(
        take(1),
        map(res => {
          this.alert.toast(res['message'])
          this.router.navigate(["/client/inventory/items"])
        })).subscribe()
    }
  }

  onSubmit() {
    if (this.mode == 'Add') {
      this.addItem()
    } else if (this.mode === 'Edit') {
      this.submitted = true
      this.isdisplayPriceGreater = false
      if (this.addItemForm.invalid) {
        this.getFormValidationErrors(this.addItemForm);
        this.scroll.scrollToFirstInvalidControl(this.el);
        return;
      }
      let displayPrice = parseFloat(this.f.displayPrice.value);
      let salePrice = parseFloat(this.f.salePrice.value);
      if (displayPrice > salePrice) {
        this.isdisplayPriceGreater = true;
        return;
      }
      let body = this.getFormData()
      this.subs.add(this.dataservice.callAPI("patch", body, `client/inventory/items/update/${this.itemId}`).subscribe(
        res => {
          this.alert.toast(res['message'])
          this.router.navigate(["/client/inventory/items"])
        }))
    }
  }

  getFormData() {
    let body = {
      name: this.f.name.value,
      salePrice: this.f.salePrice.value||0,
      displayPrice: this.f.displayPrice.value||0,
      units: this.f.units.value,
      category: this.f.category.value,
      subCategory: this.f.subCategory.value,
      description: this.f.description.value,
      productId: this.f.productId.value,
      purchasePrice: this.f.purchasePrice.value||0,
      HSNCode: this.HSNCode,
      GSTRate: this.f.GSTRate.value||0,
      manufacturerName:  this.mode==="Edit" ? this.f.manufacturerName.value :[this.f.manufacturerName.value],
      manufacturerAddress:this.mode === 'Edit' ? this.f.manufacturerAddress.value :[this.f.manufacturerAddress.value],
      commonNameofCommodity:this.mode === 'Edit' ? this.f.commonNameofCommodity.value : [this.f.commonNameofCommodity.value],
      importedCountry: this.mode === 'Edit' ? this.f.importedCountry.value :[this.f.importedCountry.value],
      ingredients: this.mode === 'Edit' ? this.f.ingredients.value : [this.f.ingredients.value],
      brandOwnerName:this.mode === 'Edit' ? this.f.brandOwnerName.value : [this.f.brandOwnerName.value],
      manufacturedate:this.f.manufacturedate.value,
      IsSellingPriceExclusiveofGST:this.f.IsSellingPriceExclusiveofGST.value=="true"? true : false,
      otherImporterName:this.mode === 'Edit' ? this.f.otherImporterName.value : [this.f.otherImporterName.value],
      brandOwnerAddress: this.mode === 'Edit' ? this.f.brandOwnerAddress.value : [this.f.brandOwnerAddress.value],
      importedCountryofOrigin: this.mode === 'Edit' ? this.f.importedCountryofOrigin.value: [this.f.importedCountryofOrigin.value],
      importerAddress:this.mode === 'Edit' ? this.f.importerAddress.value:  [this.f.importerAddress.value],
      otherFSSAILicenseNo:this.mode === 'Edit' ? this.f.otherFSSAILicenseNo.value :  [this.f.otherFSSAILicenseNo.value],
      otherImporterCountryofOrigin: this.mode === 'Edit'? this.f.otherImporterCountryofOrigin.value : [this.f.otherImporterCountryofOrigin.value],
      otherPremises: this.mode === 'Edit' ? this.f.otherPremises.value : [this.f.otherPremises.value],
      brandOwnerFSSAILicenseNo:this.mode === 'Edit' ? this.f.brandOwnerFSSAILicenseNo.value : [this.f.brandOwnerFSSAILicenseNo.value],
      importerName:this.mode === 'Edit' ? this.f.importerName.value : [this.f.importerName.value],
      importerFSSAILicenseNo:this.mode === 'Edit' ? this.f.importerFSSAILicenseNo.value : [this.f.importerFSSAILicenseNo.value],
      isVegetarian: this.f.isVegetarian.value=="true" ? true : false ,
      SGSTTaxRate: this.f.SGSTTaxRate.value||0,
      CGSTTaxRate: this.f.CGSTTaxRate.value||0,
      IGSTTaxRate: this.f.IGSTTaxRate.value||0,
      MaxSaleQuantity: this.f.MaxSaleQuantity.value||0,
      MinSaleQuantity: this.f.MinSaleQuantity.value||0,
      TimetoShip: this.f.TimetoShip.value,
      SellerPickupReturn: this.f.SellerPickupReturn.value=="true" ? true : false ,
      CODAvailability: this.f.CODAvailability.value=="true" ? true : false ,
      Cancellable: this.f.Cancellable.value=="true" ? true : false ,
      ReturnWindow: this.f.ReturnWindow.value ,
      Returnable: this.f.Returnable.value=="true" ? true : false ,
      UnitDenomination: this.f.UnitDenomination.value,
      otherImporterAddress:this.mode === 'Edit' ?  this.f.otherImporterAddress.value : [this.f.otherImporterAddress.value],
      pricepergram:this.f.pricepergram.value||0,
      Weight:this.f.Weight.value||0,
      bestbefore:this.f.bestbefore.value,
      countryOfOrigin:this.mode === 'Edit' ? this.f.countryOfOrigin.value : [this.f.countryOfOrigin.value],
      Quantity:this.f.Quantity.value||0,
      brandName:this.mode === 'Edit' ?  this.f.brandName.value : [this.f.brandName.value],
      EANCode:this.EANCode,
      marketedBy:this.mode === 'Edit' ? this.f.marketedBy.value  : [this.f.marketedBy.value],
      marketedAddress:this.mode === 'Edit'  ? this.f.marketedAddress.value: [this.f.marketedAddress.value],
      packSize:this.f.packSize.value||0,
      complaintorfeedback:this.f.complaintorfeedback.value,
      maxRetailPrice:this.f.maxRetailPrice.value||0,
      UnitValue:this.f.UnitValue.value
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

  private getItemDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `client/inventory/items/getItem/${id}`).subscribe(res => {
      this.addItemForm.patchValue(res.item[0])
      let date=new Date(res.item[0].manufacturedate).toISOString().split('T')[0];
      this.f.manufacturedate.setValue(date);
      let bestbeforeDate=new Date(res.item[0].manufacturedate).toISOString().split('T')[0];
      this.f.bestbefore.setValue(bestbeforeDate);
      this.f.productId.setValue(res.item[0].productId||res.item[0]._id)

    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }
  getSubCategories() {
    this.subs.sink = this.dataservice.callAPI("get", {}, `client/inventory/subcategory/getAll`).subscribe(res => {
      if (res.data) {
        this.subcategories = res.data
      }
    })
  }
  getCategories(){
    this.subs.sink = this.dataservice.callAPI("get", {}, `client/inventory/category/getAll`).subscribe(res => {
      if (res.data) {
        this.categories = res.data
      }
    })
  }
}
