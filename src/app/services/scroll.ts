import { Injectable } from '@angular/core'
import { ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take,debounceTime } from 'rxjs/operators';

@Injectable()
export class SharedService {
  public globalTitle = '';
}

@Injectable({ providedIn: 'root' })
export class ScrollService{
  constructor() { }
  public scrollToFirstInvalidControl(el: ElementRef) {
    const firstInvalidControl: HTMLElement = el.nativeElement.querySelector(
      "form .ng-invalid"
    );
    // firstInvalidControl.focus(); //without smooth behavior
    window.scroll({
      top: this.getTopOffset(firstInvalidControl)-50,
      left: 0,
      behavior: "smooth"
    });
    fromEvent(window, "scroll")
      .pipe(
        debounceTime(100),
        take(1)
      )
      .subscribe(() => firstInvalidControl.focus());
  }
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
}