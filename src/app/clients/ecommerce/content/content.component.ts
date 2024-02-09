import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidatorFn, ValidationErrors, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ToastService, TYPE } from '@app/services/toast';
import { CustomValidator } from '@app/services/validator';
import { SubSink } from 'subsink'
import { map, take } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';
import { environment } from '@environments/environment';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
import { ScrollService } from '@app/services/scroll';
import { ReplaySubject, Subject } from 'rxjs';
import { CurrentuserService } from '@app/services/currentuser.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private subs = new SubSink()
  clearSearchBar: Subject<boolean> = new Subject()
  editContentForm: FormGroup;
  orderItemsForm: FormGroup;
  oldValue: String = ''
  formData = new FormData();
  submitted = false;
  userId: string = ''
  profilepic: any
  valueSelected: Boolean = false;
  files: any = []
  modules: string[]
  transcribedResult: any
  name: string = '';
  fileId: any;
  placeholder: String = 'Enter Name or Number'
  check: Boolean = false;
  LinkedWithHesaathi: Boolean = true;
  fileSrc: any
  audioSrc: any;
  lang: any;
  fileType: any;
  languageEdited: any;
  fileName: string
  newcontent: any;
  baseURL: any = environment.Image_Base
  newtranscribedResult: any = '';
  subPart: any;
  LinkedWithGST:Boolean=true;
  currentOrder: any;
  currentHesaathi: any = ''
  hesaathis: any = []
  customers: any = []
  orderId: any;
  currentCustomer: any;
  existingCustomers: any;
  previousPaymentFieldValues: { [key: string]: any } = {};
  types: any = ['Shop', 'Individual', 'FPO', 'Farmer', 'Others']
  messageContent: any;
  availableLanguages: any = [
    { name: 'English', value: 'en' },
    { name: 'Hindi', value: 'hi' },
    { name: 'Tamil', value: 'ta' },
    { name: 'Telugu', value: 'te' },
    { name: 'Kannada', value: 'kn' },
    { name: 'Malayalam', value: 'ml' },
    { name: 'Punjabi', value: 'pa' }
  ]
  GSTTypes:any=["Registered - Regular GST","Registered - Comp. Scheme"]
  orderStatus: any = [{ name: "Due", value: "Due" }, { name: "Accepted", value: "Accepted" }, { name: "Shipped", value: "Shipped" }, { name: "Delivered", value: "Delivered" }, { name: "Rejected", value: "Rejected" }]
  paymentStatus: any = [{ name: "Pending", value: "Pending" }, { name: "Partially Paid", value: "Partially Paid" }, { name: "Paid", value: "Paid" }]
  orderItems: any = [];
  newCustomerId:any;
  paymentForm: FormGroup
  addCustomerForm: UntypedFormGroup;
  content: any;
  module: any = 'Ecommerce'
  audio: any = { name: '', url: '' }
  customerId: any;
  hesaathiVal: any;
  orderProcessed:Boolean=false
  coinsLeft: any;
  constructor(public dataservice: DataService,
    private formBuilder: FormBuilder,
    private alert: ToastService,
    private router: Router,
    private el: ElementRef,
    public validator: CustomValidator,
    private activerouter: ActivatedRoute,
    private toast: ToastService,
    private _auth: AuthService,
    private userService: CurrentuserService,
    private ask: ConfirmDialogService,
    private scroll: ScrollService
  ) { }

  ngOnInit(): void {
    this.orderItemsForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
    this.userService.coinsLeft$.subscribe((res) => {
      this.coinsLeft = res.coinsleft
    })
    this.activerouter.params.subscribe(params => {
      this.subPart = params['subPart']
      this.fileId = params['fileId'];
      this.getTranscriptedText();
    });
    this.editContentForm = this.formBuilder.group({
      content: new FormControl("", [Validators.required]),
    })

    this.paymentForm = new FormGroup({
      totalamount: new FormControl(),
      amountpaid: new FormControl(),
      balance: new FormControl(),
      paymentStatus: new FormControl(),
      orderStatus: new FormControl(),
      receipt: new FormControl(),
      remarks: new FormControl()
    })

    this.addCustomerForm = this.formBuilder.group({
      name: new UntypedFormControl("", [Validators.required]),
      contact: new UntypedFormControl("", [Validators.required]),
      location: new UntypedFormControl("", [Validators.required]),
      hesaathiLinking: new UntypedFormControl("Yes", [Validators.required]),
      hesaathi: new UntypedFormControl("", [Validators.required]),
      type: new UntypedFormControl("", [Validators.required]),
      GSTTreatment: new UntypedFormControl("", [Validators.required]),
      incomingContact: new UntypedFormControl("", [Validators.required]),
      GSTTreatmentType: new UntypedFormControl("",[Validators.required]),
      GSTIN: new UntypedFormControl("",[Validators.required,Validators.minLength(15),Validators.pattern(/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|26|27|28|29|30|31|32|33|34|35|36|37|38|97|99)[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/), this.validator.noWhitespaceValidator])
    })
  }

  get f() {
    return this.editContentForm.controls;
  }
  get customerFormControls() {
    return this.addCustomerForm.controls;
  }
  get paymentFormControls() {
    return this.paymentForm.controls;
  }
  
  
  addOrderItem() {
    this.items.push(this.addItemToGroup())
  }
  copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    this.toast.toast('Content Copied')
  }

    toggleGSTType(type:Boolean){
      if(type==true){
        this.LinkedWithGST=true;
        this.customerFormControls.GSTTreatmentType.setValidators([Validators.required]);
        this.customerFormControls.GSTIN.setValidators([Validators.required]);
      }else{
        this.LinkedWithGST=false;
        this.customerFormControls.GSTTreatmentType.clearValidators();
        this.customerFormControls.GSTIN.clearValidators();
      }
      this.customerFormControls.GSTTreatmentType.updateValueAndValidity();
      this.customerFormControls.GSTIN.updateValueAndValidity();
    }
  get items(): FormArray {
    return <FormArray>this.orderItemsForm.get('items');
  }

  removeItem(_id, index, name) {
    this.ask.confirmThis(`Are you sure to delete item <b>${name}</b>`, () => {
      if (_id) {
        this.subs.add(this.dataservice.callAPI("delete", { _id }, `client/ecommerce/deleteitem/${this.fileId}`).pipe(
          map(res => {
            this.alert.toast(res['message'])
          })).subscribe())

        this.items.removeAt(index)
        this.setTotalAmount()
      }
    }, () => {
      this.alert.toast("Item not deleted")
    });
  }

  setValue(value) {
    this.oldValue = value
  }
  valueChange(field, value, _id, item) {
    const isQuantityField = field === 'quantity';
    const isDisplayPriceField = field === 'displayPrice';
     let newValue;
    if (isQuantityField || isDisplayPriceField) {
      if(value){
         newValue = isQuantityField ? (parseFloat(value) * parseFloat(item.displayPrice||0)).toFixed(2) : (parseFloat(value) * parseFloat(item.quantity||0)).toFixed(2);
        item.amount = newValue;
        this.items.setValue([...this.items.value]);
      }
    }
    if (String(value).trim()!==''&& this.oldValue !== value) {
      let body = {}
      body[field] = value
      body['_id'] = _id;
      if(newValue){
        body['amount']=newValue
      }
      this.subs.add(this.dataservice.callAPI("patch", body, `client/ecommerce/updateitem/${this.fileId}`).pipe(
        map(res => {
          this.alert.toast(res['message'])
          item._id = res.data._id
          this.items.setValue([...this.items.value])
          this.setTotalAmount();
        })).subscribe())
    }
  }
  private getCustomerDetails(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `client/customers/${id}`).subscribe(res => {
      if (res.status) {
        res.customer[0].hesaathi ? this.LinkedWithHesaathi = true : this.LinkedWithHesaathi = false
        this.name = res.customer[0].name
        res.customer[0].GSTTreatment.toLowerCase()==="no" ? this.LinkedWithGST=false : this.LinkedWithGST=true;
        this.toggleGSTType(this.LinkedWithGST)
        this.addCustomerForm.patchValue(res.customer[0]);
        if (!this.LinkedWithHesaathi) {
          this.customerFormControls.hesaathi.clearValidators();
          this.customerFormControls.hesaathi.updateValueAndValidity();
        }
        if (res.hesaathi) {
          this.hesaathiVal = res.hesaathi?._id;
          this.currentHesaathi = res.hesaathi?.name + ' (' + res.hesaathi?.mobile + ')'
        }
      }
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }


  addItemToGroup(item: any = {}) {
    return new FormGroup({
      _id: new FormControl(item._id ?? ''),
      inputItem: new FormControl(item.inputItem || ''),
      itemName: new FormControl(item.itemName || ''),
      quantity: new FormControl(item.quantity || ''),
      available: new FormControl(item.available === 'true'),
      salePrice: new FormControl(item.salePrice || ''),
      displayPrice: new FormControl(item.displayPrice || ''),
      units: new FormControl(item.units || ''),
      itemunit:new FormControl(item.itemunit ?`/ ${item.itemunit}`:''),
      // purchasePrice:new FormControl(item.purchasePrice || ''),
      // HSNCode:new FormControl(item.HSNCode || ''),
      amount: new FormControl(item.amount || (parseFloat(item.quantity || 0) * parseFloat(item.displayPrice || 0)).toFixed(2) || 0),
      GSTRate: new FormControl(item.GSTRate || ''),
    })
  }

  getTranscriptedText() {
    this.subs.add(this.dataservice.callAPI("get", {}, `client/queries/getContent/${this.fileId}?module=${this.module}`).pipe(
      take(1),
      map(res => {
        this.transcribedResult = res.data.content;
        this.messageContent = this.transcribedResult?.Message
        this.content = res.data.content.content;
        this.orderItems = res.data.orderItems;
        this.fileType = this.validator.getFileType(res.data.fileContent.url)
        this.fileSrc = this.baseURL + res.data.fileContent.url;
        this.currentOrder = res.data.associatedOrder;
        this.fileName = res.data.fileContent.name;
        this.newtranscribedResult = res.data.content.editedContent || res.data.content.content;
        this.lang = res.data.content.editedLang || ''
        this.orderProcessed = res.data.associatedOrder.matched
        this.customerId = res?.data?.associatedCustomer?._id
        res?.data?.associatedCustomer?._id ? this.getCustomerDetails(res?.data?.associatedCustomer?._id) : ''
        this.orderItems.forEach(element => {
          this.items.push(this.addItemToGroup(element))
        });
        this.paymentFormControls.totalamount.setValue(res.data.associatedOrder.totalamount);
        this.paymentFormControls.balance.setValue(res.data.associatedOrder.balance);
        this.orderId = res.data.associatedOrder._id;
        this.addPayment(res.data.associatedOrder)
      })).subscribe())
  }

  addPayment(paymentVal) {
    this.paymentForm.patchValue(paymentVal)
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  onContentChange(event) {
    const value = (event.target.value);
    this.content = value;
  }
  calculateBalance(amount, field) {
    const amountVal = +amount;
    let totalAmountVal=this.paymentFormControls.totalamount.value
    let amountPaidVal=this.paymentFormControls.amountpaid.value
    if (amountVal > 0&&totalAmountVal>0&&amountPaidVal>0) {
      this.paymentFormControls[field].setValue(amount);
      let balanceAmount = (parseFloat(this.paymentFormControls.totalamount.value) - parseFloat(this.paymentFormControls.amountpaid.value)).toFixed(2);
      this.paymentFormControls.balance.setValue(balanceAmount);
      this.formData.set('balance', this.paymentFormControls.balance.value);
    }
  }
  // getItemCatalog() {
  //   if (this.currentOrder?.matched === true) {
  //     this.ask.confirmThis(`Are you sure to you want rematch the Catalog again ? Your existing items will be replaced. `, () => {
  //       this.matchCatalog();
  //     });
  //   } else {
  //     this.matchCatalog();
  //   }
  // }
  processOrder() {
    if (this.coinsLeft > 0) {
      this.submitted = false;
      let content = this.content;
      if (content.trim() == "") {
        this.submitted = true;
        return;
      }
      let body = { content, fileId: this.fileId }
      this.subs.add(this.dataservice.callAPI("post", body, `client/ecommerce/processorder`).pipe(
        take(1),
        map(res => {
          if (res.status) {
            this.alert.toast(res['message'])
            this.orderItems = res.data
            this.items.clear();
            this.userService.getCoinsLeft()
            this.getTranscriptedText();
          }
        })).subscribe());
    } else {
      this.toast.toast('Kindly purchase more coins')
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
      name: this.customerFormControls.name.value,
      contact: this.customerFormControls.contact.value,
      location: JSON.stringify(this.customerFormControls.location.value),
      hesaathiLinking: this.customerFormControls.hesaathiLinking.value,
      hesaathi: this.customerFormControls.hesaathi.value?.key ? this.customerFormControls.hesaathi.value?.key : this.hesaathiVal,
      type: this.customerFormControls.type.value,
      GSTTreatment: this.customerFormControls.GSTTreatment.value,
      orderId: this.orderId,
      GSTTreatmentType:this.customerFormControls.GSTTreatmentType.value,
      GSTIN:this.customerFormControls.GSTIN.value,
      incomingContact:this.customerFormControls.incomingContact.value
    }
    this.LinkedWithHesaathi ? body : delete body['hesaathi'];
    if(!this.LinkedWithGST){
      delete body['GSTTreatmentType'];
      delete body['GSTIN'];
     }
    return body;
  }
  onSubmit() {
    this.submitted = true
    if (this.addCustomerForm.invalid) {
      this.getFormValidationErrors(this.addCustomerForm);
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    let body = this.getFormData()
    if (this.customerId===this.newCustomerId&&this.customerId&&this.newCustomerId) {
      let body = this.getFormData();
      this.subs.add(this.dataservice.callAPI("put", body, `client/ecommerce/updateCustomer/${this.customerId}`).subscribe(
        res => {
          this.alert.toast(res['message'])
        }))
    }else if(this.customerId!==this.newCustomerId&&this.customerId&&this.newCustomerId){
      this.subs.add(this.dataservice.callAPI("put", body, `client/ecommerce/addCustomer`).pipe(
        take(1),
        map(res => {
          if (res.status) {
            this.alert.toast(res['message'])
          } else {
            this.alert.errorStatus(res['message'])
          }
        })).subscribe())   
    } else {
      this.subs.add(this.dataservice.callAPI("put", body, "client/ecommerce/addCustomer").pipe(
        take(1),
        map(res => {
          if (res.status) {
            this.alert.toast(res['message'])
          } else {
            this.alert.errorStatus(res['message'])
          }
        })).subscribe())
    }
  }
  searchHesaathi = (value: any) => {
    this.valueSelected = false;
    let subject = new ReplaySubject(1);
    this.subs.add(this.dataservice.callAPI("get", {}, `client/hesaathi/searchHesaathi?value=${value}`).pipe(
      map(res => {
        let hesaathis = res.data.list.map(hesaathi => {
          return {
            key: hesaathi._id,
            value: hesaathi.name + ' (' + hesaathi.mobile + ')'
          }
        })
        res.data = hesaathis

        subject.next(res);
        subject.complete();
      })
    ).subscribe())
    return subject
  }
  toggleHesaathiType(linking: Boolean) {
    if (linking == true) {
      this.LinkedWithHesaathi = true;
      this.customerFormControls.hesaathi.setValidators([Validators.required]);
    } else {
      this.LinkedWithHesaathi = false;
      this.customerFormControls.hesaathi.clearValidators();
    }
    this.customerFormControls.hesaathi.updateValueAndValidity();
  }
  searchCustomerName = (value) => {
    this.valueSelected = false;
    let subject = new ReplaySubject(1);
    this.subs.add(this.dataservice.callAPI("get", {}, `client/customers/searchCustomer?value=${value}`).pipe(
      map(res => {
        let customers = res.data.list.map(customer => {
          return {
            key: `{"name":"${customer.name}", "phone": ${customer.contact},"_id":"${customer._id}"}`,
            value: customer.name + ' (' + customer.contact + ')',

          }
        })
        this.existingCustomers = res.data.list
        res.data.list = customers
        if (this.existingCustomers.length == 0) {
          this.clearFormValues();
        }
        subject.next(res);
        subject.complete();
      })
    ).subscribe())
    return subject
  }

  selectCustomer = (value) => {
    this.valueSelected = true;
    let val = JSON.parse(value)
    this.name = val.name
    this.customerFormControls.name.setValue(val.name);
    this.customerFormControls.contact.setValue(val.contact);
    this.newCustomerId = val._id;
    this.getCustomerDetails(val._id);
  }
  clearFormValues() {
    this.customerFormControls.contact.setValue('');
    this.customerFormControls.location.setValue('');
    this.customerFormControls.hesaathiLinking.setValue('');
    this.customerFormControls.hesaathi.setValue('');
    this.customerFormControls.type.setValue('');
    this.customerFormControls.GSTTreatment.setValue('');
    this.customerFormControls.GSTTreatmentType.setValue('');
    this.customerFormControls.GSTIN.setValue('');
    this.currentHesaathi = ''
  }
  setTotalAmount() {
    if (this.orderId) {
      let items = this.items.length>0 ? this.items.value : this.orderItems
      const totalAmount = items.reduce((accumulator, currentItem) => {
        const itemTotal = (parseFloat(currentItem.displayPrice) || 0) * (parseFloat(currentItem.quantity) || 0);
        return accumulator + itemTotal;
      }, 0);
      this.paymentFormControls.totalamount.setValue(totalAmount.toFixed(2))
      if(this.paymentFormControls.balance.value)
      {
      this.calculateBalance(this.paymentFormControls.balance.value, 'balance');
      this.formData.set('balance', this.paymentFormControls.balance.value);
     }
     let body = { 'totalamount': totalAmount };
      if(this.paymentFormControls.amountpaid.value>0) {
        body['amountpaid']=this.paymentFormControls.amountpaid.value
      }
      if(this.paymentFormControls.balance.value>0)  {
        body['balance']=this.paymentFormControls.balance.value
      }
      this.subs.add(this.dataservice.callAPI("put", body, `client/ecommerce/addPayment/${this.orderId}`).pipe(
        take(1),
        map(res => {
          if (res.status) {
            console.log('total amount updated')
          }
        })).subscribe())
    }
  }
  private hasValueChanged(field: string, currentValue: any): boolean {
    return this.previousPaymentFieldValues[field] !== currentValue;
  }
  updatePayment(field) {
    if(field === "orderStatus" && !this.orderProcessed){
      this.alert.toast("Please process the order first");
      this.paymentFormControls.orderStatus.setValue("Due")
      return;
    }
    let data = this.paymentForm.getRawValue();
      if (field == 'amountpaid' || field == 'totalamount') {
        this.calculateBalance(data[field], field);
      }
      if (this.paymentFormControls.receipt.value && this.paymentFormControls.receipt.value.name) {
       this.formData.append('receipt', this.paymentFormControls.receipt.value, this.paymentFormControls.receipt.value.name);
      } else {
        this.formData.set('receipt', JSON.stringify(data['receipt']))
      }
      if(!data['receipt']){
        this.formData.delete('receipt')
      } 
      if(data[field]) {
       this.formData.set(field, data[field]);
      }
      if (data[field] && this.hasValueChanged(field, data[field])) {
        this.previousPaymentFieldValues[field] = data[field];
        this.subs.add(this.dataservice.callAPI("put", this.formData, `client/ecommerce/addPayment/${this.orderId}`).pipe(
          take(1),
          map(res => {
            if (res.status) {
              this.alert.toast(res['message'])
            } else {
              this.alert.errorStatus(res['message'])
            }
          })).subscribe())
      }
  }
}
