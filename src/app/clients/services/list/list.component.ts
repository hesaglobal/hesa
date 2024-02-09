import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { ToastService } from 'src/app/services/toast';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  servicesList: any[] = [];
  collectionSize
  tableVisible: boolean;
  page = 1
  pageSize = 20
  constructor(private router: Router, private dataServices: DataService, private toast: ToastService, private ask: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getPageFromService(this.page)
  }
  getPageFromService(page) {
    return this.dataServices.callAPI("get", {}, `admin/services?currentPage=${page}&pageSize=${this.pageSize}`).subscribe(data => {
      this.servicesList = data.data.services
      this.collectionSize = data.data.count
    })
  }

  private delService(id: string) {
    this.dataServices.callAPI("delete", {}, `admin/services/${id}`).subscribe(() => {
      this.getPageFromService(this.page)
      this.toast.toast("Successfully Deleted")
    })
  }

  showDialog(id: string): any {
    this.ask.confirmThis('Are you sure to delete ?', () => {
      this.delService(id)
    }, () => { });
  }

  isActive(service) {
    this.dataServices.callAPI("put",
      {
        "_id": service._id,
        "tableName": "ServicesModel"
      },
      "common/status").subscribe(() => {
        service.status = service.status == "Active" ? 'Inactive' : 'Active'
        this.toast.toast("Successfully Changed")
      })
  }
}
