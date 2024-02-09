import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  private subs = new SubSink()
  enrollments: any = []
  collectionSize: number;
  page = 1
  pageSize = 50
  constructor(private dataServices: DataService, public router: Router,public alert:ToastService,  private ask: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getEnrollments(this.page)
  }
  addEnrollment(){
    this.router.navigate(['/client/enrollments/add'])
  }
  editEnrollment(customerId:any){
    this.router.navigate([`/client/enrollments/edit/${customerId}`])
  }
  getEnrollments(page) {
    this.page=page;
    this.subs.sink = this.dataServices.callAPI("get", {}, `client/enrollment?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res => {
      if (res.data.enrollments) {
        this.enrollments = res.data.enrollments
        this.collectionSize = res.data.count
      }
    })
  }
  deleteEnrollment(enrollmentId,name){
    this.ask.confirmThis(`Are you sure to delete enrollment <b>${name}</b>`, () => {
      this.subs.sink = this.dataServices.callAPI("delete", {}, `client/enrollment/delete/${enrollmentId}`).subscribe(res => {
        if (res.status) {
          this.alert.toast(res.message);
          this.getEnrollments(this.page)
        }
      })
      }, () => {
        this.alert.toast("Enrollment not deleted")
      }); 
  }


}
