import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  private subs = new SubSink()
  items: any = []
  collectionSize: number;
  page = 1
  pageSize = 50
  constructor(private dataServices: DataService,   public router: Router,private alert: ToastService) { }

  ngOnInit(): void {
      this.subs.sink = this.dataServices.callAPI("get", {}, `client/inventory/items?currentPage=${this.page}&pageSize=${this.pageSize}`).subscribe(res => {
        if (res.data.items) {
          this.items = res.data.items
          this.collectionSize = res.data.count
        }
      })
  }
  getItems(page) {
    this.page=page;
    this.subs.sink = this.dataServices.callAPI("get", {}, `client/inventory/items?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res => {
      if (res.data.items) {
        this.items = res.data.items
        this.collectionSize = res.data.count
      }
    })
  }
  editItem(itemId){
    this.router.navigate([`/client/inventory/items/edit/${itemId}`]);
  }
  deleteItem(itemId:any){
    this.subs.sink = this.dataServices.callAPI("delete", {}, `client/inventory/items/delete/${itemId}`).subscribe(res => {
      if (res.status) {
        this.alert.toast(res.message);
        this.getItems(this.page)
      }
    })
  }
}
