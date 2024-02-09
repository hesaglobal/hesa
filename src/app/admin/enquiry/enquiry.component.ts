import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  private subs = new SubSink()
  collectionSize:number 
  page = 1
  pageSize = 50
  enquiry : any[] = []
  constructor(
    private dataService : DataService,
    public router : Router
  ) { }

  ngOnInit(): void {
    this.getEnquires()
  }

  getEnquires(){
    this.subs.sink = this.dataService.callAPI('get',{},'admin/enquiry').subscribe(res=>{
      this.enquiry = res.data.enquries
      this.collectionSize = res.data.count
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
