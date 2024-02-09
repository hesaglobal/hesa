import { Component, ViewEncapsulation, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-inlineedit',
  templateUrl: './inlineedit.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inlineedit.component.scss']
})
export class InlineeditComponent implements OnInit {
  @ViewChild('p') popover;
  @Input() content: string
  @Input() title: string
  @Input() doneAction: any
  @Input() controltype: any = 'textbox'
  @Input() item: any
  submitted = false;
  constructor(private element: ElementRef) { }

  ngOnInit(): void {}


  onSubmit(data) {
    this.submitted = true
    let ctrl = this.controltype === 'textarea'?$(this.element.nativeElement).find('textarea'): $(this.element.nativeElement).find('input')
    let val = $(ctrl)?.val()

    if (val && val !== data.value) {
      data.value = val
      if (this.doneAction) {
        this.doneAction(data).pipe(
          take(1),
          map(shouldClose => {
            console.log('Should close', shouldClose)
            if (shouldClose) {
              this.popover.close()
            }
          })
        )
        .subscribe()
      }
    }
  }

}
