import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { ToastService } from '@app/services/toast';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  private subs = new SubSink()
  popupAction: Subject<any> = new Subject();
  categoryForm: FormGroup
  submitted: boolean = false
  categories: any = []
  collectionSize: number;
  page = 1
  pageSize = 50
  categoryId: any = ''
  constructor(private dataServices: DataService,
    private ask: ConfirmDialogService,
    private alert: ToastService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCategories(1)
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  get f() {
    return this.categoryForm.controls;
  }

  showPopup() {
    this.categoryId = ''
    this.popupAction.next({ value: 'open' })
  }

  getCategories(page) {
    this.subs.sink = this.dataServices.callAPI("get", {}, `client/inventory/category?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res => {
      if (res.data.categories) {
        this.categories = res.data.categories
        this.collectionSize = res.data.count
      }
    })
  }

  editItem(category) {
    this.f.name.setValue(category.name)
    this.popupAction.next({ value: 'open' })
    this.categoryId = category._id
  }

  removeItem(category) {
    this.ask.confirmThis(`Are you sure to delete ${category.name}?`, () => {
    this.subs.add(this.dataServices.callAPI('delete', {}, `client/inventory/category/delete/${category._id}`).subscribe(res => {
     if (res.status) {
        this.getCategories(1)
        this.alert.toast(res.message)
      }
    }))
  }, () => {
    this.alert.toast("Category not deleted")
  });
  }

  addCategory() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      console.log('Invalid Form')
      return;
    }

    if(this.categoryId){
      this.subs.add(this.dataServices.callAPI('patch', this.categoryForm.value, `client/inventory/category/update/${this.categoryId}`).subscribe(res => {
        this.submitted = false;
        if (res) {
          this.categoryForm.reset()
          this.getCategories(1)
          this.alert.toast(res.message)
          this.popupAction.next({ value: 'close' })
        }
      }))
    } else {
      this.subs.add(this.dataServices.callAPI('post', this.categoryForm.value, `client/inventory/category/add`).subscribe(res => {
        this.submitted = false;
        if (res.status) {
          this.categoryForm.reset()
          this.getCategories(1)
          this.alert.toast(res.message)
          this.popupAction.next({ value: 'close' })
        }
      }))
    }

  }

}
