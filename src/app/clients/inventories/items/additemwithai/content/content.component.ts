import { Component, ElementRef, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ToastService } from '@app/services/toast';
import { SubSink } from 'subsink'
import { catchError, map, take } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { of } from 'rxjs';
import { CustomValidator } from '@app/services/validator';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ScrollService } from '@app/services/scroll';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private subs = new SubSink()
  submitted = false;
  files:any=[]
  modules:string[]
  transcribedResult:any
  ondcId:any;
  subcategories:any=[];
  categories:any=[]
  check:Boolean=false;
  baseURL: any = environment.Image_Base
  uploadedImages:any=[];
  productDesc:any=[]
  content:any;
  EANCode:any='';
  longDescription:any;
  uploadedAudio:any;
  shortDescription:any;
  addItemForm: UntypedFormGroup;
  formData = new FormData();
  isdisplayPriceGreater: boolean;
  constructor(public dataservice: DataService,
    private activerouter: ActivatedRoute,
    private toast: ToastService,
    private formBuilder: UntypedFormBuilder,
    public validator: CustomValidator,
    private scroll: ScrollService,
    private el: ElementRef,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activerouter.params.subscribe(params => {
      this.ondcId = params['ondcId'];
      this.getTranscriptedText();
    });
    this.getSubCategories();
    this.getCategories();
    this.addItemForm = this.formBuilder.group({
      itemName: new UntypedFormControl(""),
      category: new UntypedFormControl(""),
      subCategory: new UntypedFormControl(""),
      units: new UntypedFormControl(""),
      salePrice: new UntypedFormControl(""),
      displayPrice: new UntypedFormControl(""),
      productId: new UntypedFormControl("", [Validators.required]),
      purchasePrice: new UntypedFormControl(""),
      manufacturerName:  new UntypedFormControl(""),
      manufacturerAddress:  new UntypedFormControl(""),
      commonNameofCommodity:  new UntypedFormControl(""),
      manufacturedate:  new UntypedFormControl(""),
      importedCountry:  new UntypedFormControl(""),
      isVegetarian:  new UntypedFormControl(false),
      ingredients:  new UntypedFormControl(""),
      brandOwnerName:  new UntypedFormControl(""),
      brandOwnerAddress:  new UntypedFormControl(""), 
      brandOwnerFSSAILicenseNo:  new UntypedFormControl(""),
      otherFSSAILicenseNo:  new UntypedFormControl(""),
      importerName:  new UntypedFormControl(""),
      brandName:new UntypedFormControl(""),
      EANCode:new UntypedFormControl(""),
      maxRetailPrice:new UntypedFormControl(""),
      packSize:new UntypedFormControl(""),
      marketedBy:new UntypedFormControl(""),
      marketedAddress:new UntypedFormControl(""),
      complaintorfeedback:new UntypedFormControl(""),
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
      TotalTaxRate:new UntypedFormControl(""),
      pricepergram:new UntypedFormControl(""),
      Weight:new UntypedFormControl("")
    })
  }

  getTranscriptedText(){
      this.dataservice.callAPI("get", {},`client/ondc/content/${this.ondcId}`).pipe(
        take(1),
        map(res => {
          this.addItemForm.patchValue(res.data.productDesc);
          this.f.productId.setValue(res.data.productDesc._id)
          let date=new Date(res.data.productDesc.manufacturedate).toISOString().split('T')[0];
          this.f.manufacturedate.setValue(date);
          let bestbeforeDate=new Date(res.data.productDesc.manufacturedate).toISOString().split('T')[0];
          this.f.bestbefore.setValue(bestbeforeDate)
          this.longDescription=res.data.transcribedRecord.longDescription;
          this.shortDescription=res.data.transcribedRecord.shortDescription
          this.uploadedImages=res.data.uploadedRecord.file[0].filter((file)=>file.type=="image");
          this.uploadedAudio=res.data.uploadedRecord.file[0].filter((file)=>file.type=="audio");
          this.productDesc=res.data.productDesc;
        })).subscribe()
  }


  copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    this.toast.toast('Content Copied')
  }
  setDescriptionValue(type,event){
    let value=event.target.value;
    if(value.trim()!==""){
      this[type]=value
    }
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

  getFormData() {
    let body = {
      itemName: this.f.itemName.value,
      category:this.f.category.value,
      subCategory:this.f.subCategory.value,
      displayPrice:this.f.displayPrice.value,
      salePrice: this.f.salePrice.value,
      longDescription: this.longDescription,
      productId:this.f.productId.value,
      units: this.f.units.value||0,
      brandName: this.f.brandName.value||[this.f.brandName.value],
      EANCode:this.EANCode,
      marketedBy:this.f.marketedBy.value||[this.f.marketedBy.value],
      marketedAddress:this.f.marketedAddress.value||[this.f.marketedAddress.value],
      packSize:this.f.packSize.value||0,
      complaintorfeedback:this.f.complaintorfeedback.value,
      maxRetailPrice:this.f.maxRetailPrice.value||0,
      shortDescription: this.shortDescription,
      UnitValue: this.f.UnitValue.value,
      purchasePrice: this.f.purchasePrice.value||0,
      manufacturerName:  this.f.manufacturerName.value||[this.f.manufacturerName.value],
      manufacturerAddress: this.f.manufacturerAddress.value||[this.f.manufacturerAddress.value],
      commonNameofCommodity:this.f.commonNameofCommodity.value|| [this.f.commonNameofCommodity.value],
      importedCountry: this.f.importedCountry.value||[this.f.importedCountry.value],
      ingredients: this.f.ingredients.value||[this.f.ingredients.value],
      brandOwnerName:this.f.brandOwnerName.value|| [this.f.brandOwnerName.value],
      manufacturedate:this.f.manufacturedate.value,
      IsSellingPriceExclusiveofGST:this.f.IsSellingPriceExclusiveofGST.value=="true"? true : false,
      otherImporterName:this.f.otherImporterName.value||[this.f.otherImporterName.value],
      brandOwnerAddress: this.f.brandOwnerAddress.value||[this.f.brandOwnerAddress.value],
      importedCountryofOrigin: this.f.importedCountryofOrigin.value||[this.f.importedCountryofOrigin.value],
      importerAddress:this.f.importerAddress.value|| [this.f.importerAddress.value],
      otherFSSAILicenseNo:this.f.otherFSSAILicenseNo.value|| [this.f.otherFSSAILicenseNo.value],
      otherImporterCountryofOrigin: this.f.otherImporterCountryofOrigin.value||[this.f.otherImporterCountryofOrigin.value],
      otherPremises: this.f.otherPremises.value||[this.f.otherPremises.value],
      brandOwnerFSSAILicenseNo:this.f.brandOwnerFSSAILicenseNo.value||[this.f.brandOwnerFSSAILicenseNo.value],
      importerName:this.f.importerName.value||[this.f.importerName.value],
      importerFSSAILicenseNo:this.f.importerFSSAILicenseNo.value||[this.f.importerFSSAILicenseNo.value],
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
      otherImporterAddress:this.f.otherImporterAddress.value||[this.f.otherImporterAddress.value],
      bestbefore:this.f.bestbefore.value,
      countryOfOrigin:this.f.countryOfOrigin.value||[this.f.countryOfOrigin.value],
      Quantity:this.f.Quantity.value||0,
      TotalTaxRate:this.f.TotalTaxRate.value||0,
      pricepergram:this.f.pricepergram.value||0,
      Weight:this.f.Weight.value||0
    }
    if(!body.category){
      delete body['category'];
    }
    if(!body['subCategory']){
      delete body['subCategory'];
    }
    return body;
  }
  get f() {
    return this.addItemForm.controls;
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  updateResult = (event) => {
    event.preventDefault();
    this.submitted = true
    this.isdisplayPriceGreater = false
    if (this.addItemForm.invalid) {
      this.getFormValidationErrors(this.addItemForm);
      this.scroll.scrollToFirstInvalidControl(this.el);
      return;
    }
    let body=this.getFormData();
    this.subs.sink =this.dataservice.callAPI("put", body, `client/ondc/update/${this.ondcId}`).subscribe(res => {
        if(res.status){
          this.toast.toast(res['message']);
          this.router.navigate(['/client/inventory/items/add/ai'])
        }else{
          this.toast.toast(res['message'])
        }
      })
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
