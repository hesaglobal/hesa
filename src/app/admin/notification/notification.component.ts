import { Component, OnInit, ElementRef} from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SubSink } from 'subsink'
import { ToastService } from 'src/app/services/toast';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ScrollService } from 'src/app/services/scroll';
import { CustomValidator } from 'src/app/services/validator';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  private subs = new SubSink();
  notificationForm: UntypedFormGroup;
  submitted: Boolean = false;
  formData = new FormData();

  constructor(public dataservice: DataService, private el: ElementRef, private scroll: ScrollService, public validator: CustomValidator,
    private alert: ToastService,
    ) { }
  ngOnInit(): void {
    this.notificationForm = new UntypedFormGroup({
      "title": new UntypedFormControl("", [Validators.required, this.validator.noWhitespaceValidator]),
      "body": new UntypedFormControl("", [Validators.required, this.validator.noWhitespaceValidator]),
    })
  }

  get f() {
    return this.notificationForm.controls;
  }

  sendNotification(){
    this.submitted = true;
    if (this.notificationForm.invalid) {
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }
    this.subs.add(this.dataservice.callAPI("post", this.notificationForm.value, "admin/notification").subscribe(data => {
      this.alert.toast(data.message)
      this.notificationForm.reset();
      this.submitted = false
    }))
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
