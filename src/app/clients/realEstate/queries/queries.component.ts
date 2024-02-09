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
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss'],
})
export class QueriesComponent implements OnInit {
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
  status:any=[{name:"Due",id:"Due"},{name:"In-Progress",id:"In-Progress"},{name:"Resolved",id:"Resolved"},{name:"Rejected",id:"Rejected"},{name:"Cancelled",id:"Cancelled"}]
  imgUrl = environment.Image_Base;
  url: string;
  fileId: any;
  disabled: boolean = false;
  coinsLeft:any;
  collectionSize:any;
  page = 1
  module:any='CustomerCare'
  pageSize = 10;
  ngOnInit(): void {
    this.userService.coinsLeft$.subscribe((res)=>{
      this.coinsLeft = res.coinsleft
    })
    this.getTarnscribedFiles(this.page);
  }

  getTarnscribedFiles(page){
    this.page = page
    this.userService.getCoinsLeft()
    this.dataServices.callAPI("get", {},`client/realestate/queries?currentPage=${page}&pageSize=${this.pageSize}`).pipe(
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
  updateStatus(event,fileId){
    let value=event.target.value;
    if(value&&value.trim()!==''){
      let body={key:"queryStatus",value:value}
      this.dataServices.callAPI("patch", body,`client/realestate/update/${fileId}`).pipe(
        take(1),
        map(res => {
          if(res.status){
            this.toast.toast(res.message)
          }else{
            this.toast.errorStatus(res.message)
          }  
          this.getTarnscribedFiles(this.page)
        })).subscribe()
    }
  }
}
