import { Component, Input, OnInit, ElementRef, forwardRef, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from '@app/services/date/dateparserformatter';
import { CustomAdapter } from '@app/services/date/dateadapter';
import { NgbdateformatPipe } from '../pipes/ngbdateformat.pipe';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    },
    NgbdateformatPipe
  ]
})
export class CalendarComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = "Select date"
  @Input() onChangeAction: any
  private _selectValue: string
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private input: any
  public showResults: boolean = false
  constructor(public formatter: NgbDateParserFormatter, private element: ElementRef, private dateFormat: NgbdateformatPipe) { }

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
    this._selectValue = this.formatNGBDate(value)
    this._onChangeCallback(value);
    this._onTouchedCallback();
  }

  ngOnInit(): void {
    this.input = $(this.element.nativeElement).find('input')
  }

  onDateSelection(date: NgbDate) {
    this.selectValue = date;
    this._onChangeCallback(this.selectValue);
    this._onTouchedCallback();
  }

  formatNGBDate(date){
    return typeof date === 'object' ? date.year+'-' + date.month+'-'+ date.day : date
  }

}
