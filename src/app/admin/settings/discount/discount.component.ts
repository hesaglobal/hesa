import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
import { ToastService } from '@app/services/toast';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  private subs = new SubSink()
  discounts: any[] = []
  constructor(private dataServices: DataService,
     public router: Router,
     private ask: ConfirmDialogService,
     private toast: ToastService) { }

  ngOnInit(): void {
    this.getDiscounts()
  }

  getDiscounts() {
    this.subs.sink = this.dataServices.callAPI("get", {}, `admin/discounts`).subscribe(res => {
      this.discounts = res.data.discounts
    })
  }

  editDiscount(discountId) {
    this.router.navigate([`/admin/setting/discount/${discountId}`])
  }

  showDialog(discountId: string): any {
    this.ask.confirmThis('Are you sure to delete ?', () => {
      this.subs.add(this.dataServices.callAPI("delete", {}, `admin/discounts/${discountId}`).subscribe(data => {
        this.getDiscounts()
        this.toast.toast("Successfully Deleted")
      }))
    }, () => {
      this.toast.toast("Discount not deleted")
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
