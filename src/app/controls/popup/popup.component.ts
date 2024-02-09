import { Component, OnInit, Input, Type, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit {
  modalsNumber = 0;
  @Input() title: string = ''
  @Input() popupAction: Subject<any>;
  @ViewChild('content') content: HTMLElement;
  modalReference: NgbModalRef;
  element: any;

  constructor(private modalService: NgbModal, private ele: ElementRef) {
    this.element = ele.nativeElement;
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  open(modal) {
    this.modalReference = this.modalService.open(modal)
  }
  close(){
    this.modalReference.close()
  }

  ngOnInit(): void {
    let self=this
    this.popupAction.subscribe((obj) => {
      if(obj.value === 'open'){
        self.open(self.content)
      } else {
        self.close()
      }
    });
  }

}