import { Component, ViewEncapsulation, OnInit, Input, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { DataService } from '@app/services/data/data.service';
import { ToastService } from '@app/services/toast';

@Component({
  selector: 'app-uploadpopover',
  templateUrl: './uploadpopover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./uploadpopover.component.scss']
})
export class UploadpopoverComponent implements OnInit {
  @ViewChild('p') popover;
  @Input() content: string
  @Input() title: string
  @Input() doneAction: any
  @Input() module: any
  @Input() maxLimit: any;
  @Input() allowedDuration:any;
  addFileForm: UntypedFormGroup;
  submitted = false;
  formData = new FormData();
  constructor(private dataServices: DataService, private formBuilder: UntypedFormBuilder, private toast: ToastService) { }

  ngOnInit(): void {
    this.addFileForm = this.formBuilder.group({
      file: new UntypedFormControl('', [Validators.required]),
      module: new UntypedFormControl(this.module, [Validators.required]),
    })
  }
  get f() {
    return this.addFileForm.controls;
  }

  setFormData() {
    this.formData.set('module', this.module);
    if (this.f.file.value.length > 0) {
      for (let i = 0; i < this.f.file.value.length; i++) {
        this.formData.append("file", this.f.file.value[i], this.f.file.value[i].fileName);
      }
    }
  }
  clearingFiles() {
    this.formData = new FormData();
    this.f.file.setValue('')
  }
  onSubmit() {
    this.submitted = true
    if (this.addFileForm.invalid) {
      this.clearingFiles();
      return;
    }
    this.setFormData()
    if (this.f.file.value.length > 0) {
      this.dataServices.callAPI("post", this.formData, "common/upload").pipe(
        take(1),
        map(res => {
          this.popover.close()
          this.submitted = false
          this.clearingFiles();
          this.toast.toast(res['message'])
          if (this.doneAction) {
            this.doneAction()
          }
        })).subscribe()
    } else {
      return;
    }
  }

}
