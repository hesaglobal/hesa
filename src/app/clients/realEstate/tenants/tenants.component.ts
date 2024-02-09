import { Component, OnInit, ElementRef } from '@angular/core';
import { SubSink } from 'subsink';
import { DataService } from '@app/services/data/data.service';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { map, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from '@app/services/toast';
import { CurrentuserService } from '@app/services/currentuser.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
})
export class TenantComponent implements OnInit {
  constructor(
    public dataServices: DataService,
    public router: Router,
    public _auth:AuthService,
    private toast:ToastService,
    public userService:CurrentuserService,
    public activatedRoute:ActivatedRoute
  ) {}
  private subs = new SubSink();
  popupAction: Subject<any> = new Subject();
  queries: any[] = [];
  transribedResult: any
  status:any=[{name:"Processed",id:"Processed"},{name:"Resolved",id:"Resolved"},{name:"Rejected",id:"Rejected"},{name:"Cancelled",id:"Cancelled"}]
  imgUrl = environment.Image_Base;
  url: string;
  fileId: any;
  disabled: boolean = false;
  coinsLeft:any;
  collectionSize:any;
  page = 1
  pageSize = 10;
  module:any='Jobs';
  ngOnInit(): void {
    this.userService.coinsLeft$.subscribe((res)=>{
      this.coinsLeft = res.coinsleft
    })
    this.getTarnscribedFiles(this.page);
  }

  getTarnscribedFiles(page){
    this.page = page
    this.userService.getCoinsLeft();
    let estateHolders="Tenant"
    this.dataServices.callAPI("get", {},`client/realestate/queries?currentPage=${page}&pageSize=${this.pageSize}&estateHolders=${estateHolders}`).pipe(
      take(1),
      map(res => {
        this.queries = res.data.queries;
        this.collectionSize = res.data.count
      })).subscribe()
  }

  doneAction = () => {
    let self = this
    self.getTarnscribedFiles(this.page)
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    this.toast.toast('Content Copied')
  }
  viewFile(fileId){
      this.router.navigate(['/client/realestate/audio','queries', fileId]);
  }
  download(file) {
    saveAs(`${environment.Image_Base}${file.url}`, file.name)
  }
}
