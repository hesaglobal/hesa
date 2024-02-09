import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  private subs = new SubSink()
  staffs : any = []
  collectionSize: number;
  page = 1
  pageSize = 50
  
  constructor(
    public dataService : DataService,
    private router: Router,
    private alert: ToastService,
    private ask: ConfirmDialogService
  ) { }

  ngOnInit(): void {
   this.getStaffs(1)
  }

  getStaffs(page){
    this.subs.sink = this.dataService.callAPI("get", {}, `client/staff/getStaffs?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res=>{
      this.staffs = res.data.staffs
    })
  }

  edit(staffId){
    this.router.navigate([`/client/staff/edit/${staffId}`]);
  }
  delete(staffId:any,name:any){
    this.ask.confirmThis(`Are you sure to staff <b>${name}</b>?`, () => {
      this.subs.sink = this.dataService.callAPI("delete", {}, `client/staff/deleteStaff/${staffId}`).subscribe(res => {
        if (res.status) {
          this.alert.toast(res.message);
          this.getStaffs(this.page)
        }
      }) 
    }, () => {
      this.alert.toast("Staff not deleted")
    });
  }

}
