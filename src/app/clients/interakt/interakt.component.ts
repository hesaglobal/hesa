import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
import { CurrentuserService } from '@app/services/currentuser.service';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'app-interakt',
  templateUrl: './interakt.component.html',
  styleUrls: ['./interakt.component.scss']
})
export class InteraktComponent implements OnInit {
  private subs = new SubSink()
  interaktmessages: any = []
  collectionSize: number;
  page = 1;
  pageSize = 20;
  coinsLeft: any;
  messageId:any;
  constructor(private dataServices: DataService, public userService: CurrentuserService,public router: Router,private alert: ToastService, private ask: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getInteraktMessages(this.page);
    this.userService.coinsLeft$.subscribe((res) => {
      this.coinsLeft = res.coinsleft
    })
  }
  getInteraktMessages(page) {
    this.page=page;
    this.subs.add(this.dataServices.callAPI("get", {}, `client/interakt/list?currentPage=${page}&pageSize=${this.pageSize}`).pipe(
      take(1),
      map(res => {
        if (res.data.interaktmessages) {
          this.interaktmessages = res.data.interaktmessages
          this.collectionSize = res.data.count
        }
      })).subscribe())
  }
  onReplay(messageId) {
    if (this.coinsLeft > 0) {
      this.messageId=messageId;
      let body={messageId}
      this.subs.add(this.dataServices.callAPI("post", body, `client/message`).pipe(
          take(1),
          map(res => {
            this.alert.toast(res['message']);
            this.getInteraktMessages(this.page);
          })).subscribe())
      }else {
      this.alert.toast('Kindly purchase more coins')
    }
  }
  viewFile(fileId,module){
    if(fileId&&module){
     if(module.toLowerCase()==="ecommerce"){
      this.router.navigate([`/client/ecommerce/transcribe/${fileId}`])
     }else if(module.toLowerCase()==="customercare"){
      this.router.navigate([`/client/customercare/audio/transcribe/${fileId}`])
     }else if(module.toLowerCase()==="realestate"){
      this.router.navigate([`/client/realestate/audio/transcribe/${fileId}`])
     }else{
      this.router.navigate([`client/jobs/audio/transcribe/${fileId}`])
     }
    }
  }
}
