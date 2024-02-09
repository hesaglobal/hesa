import { Component, Input, OnInit, ElementRef, forwardRef } from '@angular/core';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {
  @Input() placeholder: string = "Select date"
  // private input: any
  constructor(private element: ElementRef) { }


  ngOnInit(): void {
    // this.input = $(this.element.nativeElement).find('input')
  }

}
