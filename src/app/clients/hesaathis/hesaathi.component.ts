import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-hesaathis',
  templateUrl: './hesaathi.component.html',
  styleUrls: ['./hesaathi.component.scss']
})
export class HesaathiComponent implements OnInit {
  private subs = new SubSink()
  hesaathis: any = []
  collectionSize: number;
  page = 1
  pageSize = 50
  constructor(private dataServices: DataService,   public router: Router,private alert: ToastService, private ask: ConfirmDialogService) { }

  ngOnInit(): void {
     this.getHesaathi(1)
  }
  getHesaathi(page) {
    this.page=page;
    this.subs.sink = this.dataServices.callAPI("get", {}, `client/hesaathi/list?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res => {
      if (res.data.hesaathi) {
        this.hesaathis = res.data.hesaathi
        this.collectionSize = res.data.count
      }
    })
  }

  delete(hesaathi:any){
    this.ask.confirmThis(`Are you sure to delete hesaathi <b>${hesaathi.name}</b>?`, () => {
    this.subs.sink = this.dataServices.callAPI("delete", {}, `client/hesaathi/delete/${hesaathi._id}`).subscribe(res => {
      if (res.status) {
        this.alert.toast(res.message);
        this.getHesaathi(this.page)
      }
    })
  }, () => {
    this.alert.toast("Hesaathi not deleted")
  });

  }
}
