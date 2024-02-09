import { Component, OnInit, Input, Type, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  closeResult = '';

  modalsNumber = 0;
  @Input() title: string = ''
  @Input() val:string=''
  @Input() label:string=''
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
    this.modalReference = this.modalService.open(modal, 
      {
        ariaLabelledBy: 'modal-basic-title', 
        size: 'lg', 
        windowClass: 'custom-class'
    })
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

