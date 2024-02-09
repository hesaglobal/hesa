import { Component, ViewEncapsulation, OnInit, Input, ElementRef } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-editcontrol',
  templateUrl: './editcontrol.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editcontrol.component.scss']
})
export class EditControlComponent implements OnInit {

  @Input() doneAction: any
  @Input() item: any
  submitted = false;
  constructor(private element: ElementRef) { }

  ngOnInit(): void {}


  onSubmit(data) {
    this.submitted = true
    let ctrl = $(this.element.nativeElement).find('input')
    let val = $(ctrl)?.val()

    if (val && val !== data.value) {
      data.value = val
      if (this.doneAction) {
        this.doneAction(data).pipe(
          take(1),
          map(shouldClose => {
            if(shouldClose){
              console.log("Updated!")
            }
          })
        )
        .subscribe()
      }
    }
  }

}
