import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  private subs = new SubSink()
  customers: any = []
  collectionSize: number;
  page = 1
  pageSize = 50
  constructor(private dataServices: DataService,   public router: Router,public alert:ToastService,  private ask: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getCustomers(this.page)
  }
  addCustomer(){
    this.router.navigate(['/client/customers/add'])
  }
  editCustomer(customerId:any){
    this.router.navigate([`/client/customers/edit/${customerId}`])
  }
  getCustomers(page) {
    this.page=page;
    this.subs.sink = this.dataServices.callAPI("get", {}, `client/customers?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res => {
      if (res.data.customers) {
        this.customers = res.data.customers
        this.collectionSize = res.data.count
      }
    })
  }
  deleteCustomer(customerId,name){
    this.ask.confirmThis(`Are you sure to delete customer <b>${name}</b>`, () => {
      this.subs.sink = this.dataServices.callAPI("delete", {}, `client/customers/delete/${customerId}`).subscribe(res => {
        if (res.status) {
          this.alert.toast(res.message);
          this.getCustomers(this.page)
        }
      })
      }, () => {
        this.alert.toast("Customer not deleted")
      }); 
  }


}
