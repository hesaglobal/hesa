import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SubSink } from 'subsink'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {

  private subs = new SubSink()
  dashboardData: any;
  winnersList: any[] = [];
  categories: any[] = [];
  contestId: string;
  categoryId: string;
  ageGroupId:string;
  ageGroups:any[]=[]
  constructor(private dataServices: DataService) { }

  ngOnInit(): void {
    // this.subs.sink = this.dataServices.callAPI("get", {}, `admin/dashboard/getDashboard`).subscribe(res => {
    //   this.dashboardData = res.data
    //   this.contestId = res.data.contests[0]._id
      // if(this.contestId){
      //   this.subs.sink = this.dataServices.callAPI("get", {}, `admin/dashboard/getWinnersList/${this.contestId}`).subscribe(res => {
      //     this.winnersList = res.data
      //   })
      //   this.subs.sink = this.dataServices.callAPI("get", {}, `admin/dashboard/getCategoryFilter/${this.contestId}`).subscribe(res => {
      //     this.categories = res.data?.category
      //   })
      //   this.subs.sink = this.dataServices.callAPI("get", {}, `admin/dashboard/getAgeFilter/${this.contestId}`).subscribe(res => {
      //     this.ageGroups = res.data?.groups
      //   })
      // }
    // })

  }


  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
