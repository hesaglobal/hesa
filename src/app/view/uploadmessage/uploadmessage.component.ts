import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { ToastService } from '@app/services/toast';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-upload-message',
  templateUrl: './uploadmessage.component.html',
  styleUrls: ['./uploadmessage.component.scss']
})
export class UploadMessageComponent implements OnInit {
  hidePreLoader:Boolean=true;
  private subs = new SubSink();
  userId:any;
  shouldReset:Boolean=false;
  constructor(private dataservice:DataService,public alert:ToastService,public router:Router, private activerouter: ActivatedRoute,) {}
  ngOnInit(): void {
    this.activerouter.params.subscribe(params => {
      this.userId=params['userId']
    });
  }
  uploadAudio(audioData:FormData){
    audioData.append("userId",this.userId);
    this.hidePreLoader=false;
    this.subs.add(this.dataservice.callAPI("post", audioData, `client/message/uploadaudio`).subscribe(
      res => {
        this.hidePreLoader=true;
        if(res.status){
          this.alert.toast(res['message']);
          this.shouldReset=true
        }else{
          this.alert.errorStatus(res['message'])
        }
     }))
  }
}

