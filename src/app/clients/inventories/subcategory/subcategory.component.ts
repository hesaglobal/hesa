import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { ToastService } from '@app/services/toast';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  private subs = new SubSink()
  popupAction: Subject<any> = new Subject();
  subCategoryForm: FormGroup
  submitted: boolean = false
  subCategories: any = []
  categories: any = []
  collectionSize: number;
  page = 1
  pageSize = 50
  subCategoryId: any = ''
  constructor(public dataService: DataService,
    private ask: ConfirmDialogService,
    private alert: ToastService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSubcategories(1)
    this.getCategories()
    this.subCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
    })
  }

  get f() {
    return this.subCategoryForm.controls;
  }

  showPopup() {
    this.subCategoryId = ''
    this.popupAction.next({ value: 'open' })
  }

  getSubcategories(page) {
    this.subs.sink = this.dataService.callAPI("get", {}, `client/inventory/subcategory?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res => {
      if (res.data.subcategories) {
        this.subCategories = res.data.subcategories
        this.collectionSize = res.data.count
      }
    })
  }


  getCategories() {
    this.subs.sink = this.dataService.callAPI("get", {}, `client/inventory/category`).subscribe(res => {
      if (res.data.categories) {
        this.categories = res.data.categories
        this.f.categoryId.setValue(this.categories[0]._id)
      }
    })
  }

  editItem(subcategory) {
    this.f.name.setValue(subcategory.name)
    this.f.categoryId.setValue(subcategory.categoryId)
    this.popupAction.next({ value: 'open' })
    this.subCategoryId = subcategory._id
  }

  removeItem(subcategory) {
    this.ask.confirmThis(`Are you sure to delete ${subcategory.name}?`, () => {
    this.subs.add(this.dataService.callAPI('delete', {}, `client/inventory/subcategory/delete/${subcategory._id}`).subscribe(res => {
     if (res.status) {
        this.getSubcategories(1)
        this.alert.toast(res.message)
      }
    }))
  }, () => {
    this.alert.toast("Sub-Category not deleted")
  });
  }

  addSubCategory() {
    this.submitted = true;
    if (this.subCategoryForm.invalid) {
      console.log('Invalid Form')
      return;
    }

    if(this.subCategoryId){
      this.subs.add(this.dataService.callAPI('patch', this.subCategoryForm.value, `client/inventory/subcategory/update/${this.subCategoryId}`).subscribe(res => {
        this.submitted = false;
        if (res.status) {
          this.subCategoryForm.reset()
          this.getSubcategories(1)
          this.alert.toast(res.message)
          this.popupAction.next({ value: 'close' })
        }
      }))
    } else {
      this.subs.add(this.dataService.callAPI('post', this.subCategoryForm.value, `client/inventory/subcategory/add`).subscribe(res => {
        this.submitted = false;
        if (res.status) {
          this.subCategoryForm.reset()
          this.getSubcategories(1)
          this.alert.toast(res.message)
          this.popupAction.next({ value: 'close' })
        }
      }))
    }

  }

}
