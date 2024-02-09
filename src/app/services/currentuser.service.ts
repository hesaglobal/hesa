import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { DataService } from '@app/services/data/data.service';

interface GetCoinsLeftResponse {
    coinsleft: number
}


@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {
  public coinsLeft$: Observable<GetCoinsLeftResponse>
  coinsUsed:any;
  constructor(private dataService: DataService) {
   this.getCoinsLeft()
  }

  getCoinsLeft():Observable<GetCoinsLeftResponse>{
    return this.coinsLeft$=this.dataService.callAPI("get",{},"common/coinsLeft").pipe(
      shareReplay(1)
    )
  }


}
