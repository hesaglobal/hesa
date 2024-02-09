import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  private subs = new SubSink()
  winners: any[] = []
  contestId: string='';
  ageGroupId:string='';
  categoryId:string='';
  contests: any[] = []
  ageGroups:any[]=[]
  categories:any[]=[]
  
  constructor(private dataServices: DataService,
     public router: Router) { }

  ngOnInit(): void {
    console.log(1)
    this.subs.sink = this.dataServices.callAPI("get", {}, `admin/winners/screen`).subscribe(res => {
      this.contests = res.data?.contests
      this.categories=res.data?.categories
      this.ageGroups=res.data?.ageGroups
      // this.contestId = this.contests[0]?._id
      // this.ageGroupId=this.ageGroups[0]?._id;
      // this.categoryId=this.categories[0]?._id;
      this.getWinners()
    })
  }

  getWinners() {
   let url = `admin/winners?contest=${this.contestId}&ageGroupId=${this.ageGroupId}&categoryId=${this.categoryId}`
    this.subs.sink = this.dataServices.callAPI("get", {}, `${url}`).subscribe(res => {
      console.log(res,"res???????????????????")
      this.winners = res.data.winners
    })
  }

  onContestChange(id){
    this.contestId = id
    this.getWinners()
  }
  onAgeGroupChange(id){
    this.ageGroupId=id;
    this.getWinners();
  }
  onCategoryChange(id){
    this.categoryId=id;
    this.getWinners();
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
