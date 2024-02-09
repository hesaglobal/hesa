import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { ToastService } from '@app/services/toast';
import { SubSink } from 'subsink'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    public dataServices: DataService,
    public router: Router,
    private toast:ToastService,
    public activatedRoute:ActivatedRoute
  ) {}
  private subs = new SubSink()
  orders: any[] = [];
  collectionSize:any;
  page = 1
  module:any='Ecommerce'
  pageSize = 10;
  item:any;
  ngOnInit(): void {
    this.getOrders(this.page);
  }

  getOrders(page){
    this.page = page
    this.dataServices.callAPI("get", {},`client/ecommerce/orders?currentPage=${page}&pageSize=${this.pageSize}`).pipe(
      take(1),
      map(res => {
        this.orders = res.data.orders;
        this.collectionSize = res.data.count
      })).subscribe()
  }

  processOrderById(order){
    order.processing = true
    this.subs.add(this.dataServices.callAPI("get", {}, `client/ecommerce/processorder/${order._id}`).pipe(
      take(1),
      map(res => {
        if (res.status) {
          order.matched = true
          order.processing = false
        }
      })).subscribe())
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  downloadReceipt(order){
    this.item=order;
    this.subs.add(this.dataServices.callAPI("get", {}, `client/ecommerce/generateReceipt/${order}`).pipe(
      take(1),
      map(async (res) => {
        if (res.pdfURL && res.status) {
          const response = await fetch(res.pdfURL);
          if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'report.pdf');
            link.click();
            window.URL.revokeObjectURL(link.href);
         
          }
        }
      })).subscribe())
  }
}
