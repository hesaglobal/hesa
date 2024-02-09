import { Component, Input, OnInit, ElementRef, forwardRef, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataService } from '@app/services/data/data.service';
import { fromEvent, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
@Component({
  selector: 'app-searchNew',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchNewComponent),
      multi: true
    }
  ]
})
export class SearchNewComponent implements OnInit, ControlValueAccessor {
  @Input() list: any[]
  @Input() placeholder: string = "Search value"
  @Input() onSearchAction: any
  @Input() defaultValue: any = { key: '', value: '' }
  private _selectValue: any = { key: '', value: '' }
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private input: any
  public showResults: boolean = false
  constructor(public dataservice: DataService, private element: ElementRef) { }

  writeValue(value: any): void {
    this._selectValue = value;
  }
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      $(this.input).addClass('disabled')
    } else {
      $(this.input).removeClass('disabled')
    }
  }

  get selectValue(): any {
    return this._selectValue
  }

  set selectValue(value: any) {
    this._selectValue = value
    this._onChangeCallback(value);
    this._onTouchedCallback();
  }

  ngOnInit(): void {
    this.input = $(this.element.nativeElement).find('input')
    fromEvent(this.input, 'keyup').pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((event) => {
      let self = this
     self.search(event)
    })
  }

  navigate(item) {
    this.selectValue = item
    this.showResults = false
  }

  search(event) {
    if ([38, 40, 13].indexOf(event.keyCode) >= 0) {
      return false
    }
    let searchtext = event.target.value
      this.onSearchAction(searchtext)
        .pipe(
          map(result => {
            this.list = result['data']
            this.showResults = true
          }),
          catchError(() => {
            return of(false)
          })
        )
        .subscribe()
  }

  blurHandler(event) {
    let self = this
    setTimeout(function () {
      if (!self.defaultValue && !self.selectValue.value) {
        event.target.value = ''
      } else {
        event.target.value = self.selectValue.value || self.defaultValue.value
      }
      self.showResults = false
    }, 400)
  }

  handleArrowKeys(event) {
    if ([38, 40, 13].indexOf(event.keyCode) < 0) {
      return true
    }
    let key = event.keyCode
    let results = this.list
    let selectedIndex = results.findIndex(item => item.selected)
    let resultCount = results.length
    let initial = false
    if (selectedIndex < 0) {
      selectedIndex = 0
      initial = true
    }

    // Up arrow key
    if (key === 38) {
      if (initial) {
        results[0].selected = true
        initial = false
      } else if (selectedIndex === 0) {
        results[0].selected = false
        results[resultCount - 1].selected = true
      } else {
        results[selectedIndex - 1].selected = true
        results[selectedIndex].selected = false
      }
      return true
    }

    // Down arrow Key
    if (key === 40) {
      if (initial) {
        results[0].selected = true
        initial = false
      } else if (selectedIndex < resultCount - 1) {
        results[selectedIndex].selected = false
        results[selectedIndex + 1].selected = true
      } else {
        results[selectedIndex].selected = false
        results[0].selected = true
      }
      return true
    }

    if (key === 13 && selectedIndex !== -1) {
      let item = results[selectedIndex]
      selectedIndex = 0
      if(!item) {
        return false
      }
      if (this.showResults) {
        event.preventDefault()
        // event.stopPropegation()
        this.showResults = false
        this.navigate(item)
      }
      return true
    }
  }

}
