import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { ConfirmDialogService } from '@app/shared/confirm-dialog/confirm-dialog.service';
import { ToastService } from '@app/services/toast';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  private subs = new SubSink()
  packages: any[] = []
  constructor(private dataServices: DataService,
     public router: Router,
     private ask: ConfirmDialogService,
     private toast: ToastService) { }

  ngOnInit(): void {
    this.getPackages()
  }

  getPackages() {
    this.subs.sink = this.dataServices.callAPI("get", {}, `admin/packages`).subscribe(res => {
      this.packages = res.data.packages
    })
  }

  editPackage(packageId) {
    this.router.navigate([`/admin/setting/package/${packageId}`])
  }

  showDialog(packageId: string): any {
    this.ask.confirmThis('Are you sure to delete ?', () => {
      this.subs.add(this.dataServices.callAPI("delete", {}, `admin/packages/${packageId}`).subscribe(data => {
        this.getPackages()
        this.toast.toast("Successfully Deleted")
      }))
    }, () => {
      this.toast.toast("Package not deleted")
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
