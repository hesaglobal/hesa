import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  @Input() content: string
  @Input() title: string
  @Input() triggers: string ='mouseenter:mouseleave'
  constructor() { }

  ngOnInit(): void {
  }

}
