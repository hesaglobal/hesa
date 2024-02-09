import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  private subs = new SubSink()
  departments: any = []
  collectionSize: number;
  page = 1
  pageSize = 50
  constructor(private dataServices: DataService,   public router: Router,public alert:ToastService,  private ask: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getDepartments(this.page)
  }
  addDepartment(){
    this.router.navigate(['/client/departments/add'])
  }
  editDepartment(departmentId:any){
    this.router.navigate([`/client/departments/edit/${departmentId}`])
  }
  getDepartments(page) {
    this.page=page;
    this.subs.sink = this.dataServices.callAPI("get", {}, `client/department?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(res => {
      if (res.data.departments) {
        this.departments = res.data.departments
        this.collectionSize = res.data.count
      }
    })
  }
  deleteDepartment(departmentId,name){
    this.ask.confirmThis(`Are you sure to delete department <b>${name}</b>`, () => {
      this.subs.sink = this.dataServices.callAPI("delete", {}, `client/department/delete/${departmentId}`).subscribe(res => {
        if (res.status) {
          this.alert.toast(res.message);
          this.getDepartments(this.page)
        }
      })
      }, () => {
        this.alert.toast("Department not deleted")
      }); 
  } 
  updateStatus(id,status){
    status = !status;
    this.subs.sink = this.dataServices.callAPI("put", {status}, `client/department/update/${id}`).subscribe(res => {
      this.alert.toast(res['message'])
      this.getDepartments(this.page);
    })
  }
}
