import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService, TYPE } from '@app/services/toast';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private subs = new SubSink()
  users: any[] = []
  collectionSize: number;
  page = 1
  pageSize = 10

  constructor(private dataServices: DataService, public router: Router,private alert: ToastService,) { }

  ngOnInit(): void {
    this.subs.sink = this.dataServices.callAPI("get", {}, `admin/users/getAll?currentPage=${this.page}&pageSize=${this.pageSize}`).subscribe(res => {
      this.users = res.data.users
      this.collectionSize = res.data.count
    })
  }

  getPageFromService(page) {
    this.subs.sink = this.dataServices.callAPI("get", {}, `admin/users/getAll?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res => {
      this.users = res.data.users
      this.collectionSize = res.data.count
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  editUser(Id) {
    this.router.navigate([`/admin/users/${Id}`])
  }
  updateStatus(id,status){
    status = !status;
    this.subs.sink = this.dataServices.callAPI("put", {status}, `admin/users/changeStatus/${id}`).subscribe(res => {
      this.alert.toast(res['message'])
      this.getPageFromService(this.page);
    })
  }
  uploadOrder(userId:any){
    let uploadOrderURL=window.location.origin+"/view/"+userId+"/uploadaudio"
    navigator.clipboard.writeText(uploadOrderURL);
    this.alert.toast('Link Copied')
  }
}
