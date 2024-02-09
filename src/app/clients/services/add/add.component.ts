import { Component, ElementRef, OnInit} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { ScrollService } from 'src/app/services/scroll';
import { ToastService, TYPE } from 'src/app/services/toast';
import { CustomValidator } from 'src/app/services/validator';
import { SubSink } from 'subsink'
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  inprocess: boolean = false;
  private subs = new SubSink()
  serviceForm: UntypedFormGroup;
  submitted = false;

  formData = new FormData();

  mode: string = "Add";
  private serviceId: string = "";
  service: any;

  constructor(public dataservice: DataService,
    private alert: ToastService,
    private router: Router,
    private scroll: ScrollService,
    public vaidator: CustomValidator,
    private activerouter: ActivatedRoute,
    private toast: ToastService) { }
  private el: ElementRef

  ngOnInit(): void {
    this.subs.sink = this.activerouter.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = "Edit";
        this.serviceId = paramMap.get('id');
        this.getServiceByID(this.serviceId)
      }
    })

    this.serviceForm = new UntypedFormGroup({
      "name": new UntypedFormControl("", [Validators.required, this.vaidator.noWhitespaceValidator]),
      "iconClass": new UntypedFormControl("", [Validators.required, this.vaidator.noWhitespaceValidator]),
      "description": new UntypedFormControl("", [Validators.minLength(75)])
    })
  }

  get f() {
    return this.serviceForm.controls;
  }

  addService() {
    this.submitted = true;

    if (this.serviceForm.invalid) {
      this.scroll.scrollToFirstInvalidControl(this.el)
      return;
    }

    if (this.mode == 'Add') {
      this.subs.add(this.dataservice.callAPI("post", this.serviceForm.value, "admin/services").subscribe(data => {
        this.alert.toast(data.message)
        this.router.navigate(['/admin/services/list'])
      }))
    }

    if (this.mode == 'Edit') {
      this.subs.add(this.dataservice.callAPI("put", this.serviceForm.value, `admin/services/${this.serviceId}`).subscribe(data => {
        this.alert.toast(data.message)
        this.router.navigate(['/admin/services/list'])
      }))
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  private getServiceByID(id: string) {
    this.subs.add(this.dataservice.callAPI("get", {}, `admin/services/${id}`).subscribe(res => {
      this.serviceForm.setValue({
        name: res.data.service.name,
        iconClass: res.data.service.iconClass,
        description: res.data.service.description
     });
    }, (error: any) => {
      this.router.navigate(['/admin/error/error-404'])
    }))
  }
}
