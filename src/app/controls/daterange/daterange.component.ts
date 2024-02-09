import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from '@app/services/date/dateadapter';
import { CustomDateParserFormatter } from '@app/services/date/dateparserformatter';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Daterange } from '@app/models/daterange';
 @Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DaterangeComponent),
      multi: true
    }
  ]
})

export class DaterangeComponent implements ControlValueAccessor {
	hoveredDate: NgbDate | null = null;
  @Input() options: any = {
    fromDatePlaceHolder: 'Select from date',
    toDatePlaceHolder: 'Select to date',
    fromLabel: 'From Date',
    toLabel: 'To Date'
  }

  private _selectValue: Daterange;
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private calendars: any
	constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private element: ElementRef) {

	}

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
      $(this.calendars).addClass('disabled')
    } else {
      $(this.calendars).removeClass('disabled')
    }
  }

  get selectValue(): any {
    return this._selectValue
  }

  set selectValue(value: any) {
    this._onChangeCallback(value);
    this._onTouchedCallback();
  }

  ngAfterViewInit(): void {
    this.calendars = $(this.element.nativeElement).find('.cal')
  }

	onDateSelection(date: NgbDate) {
		if (!this.selectValue?.fromDate && !this.selectValue?.toDate) {
			this.selectValue.fromDate = date;
      this._onChangeCallback(this.selectValue);
          this._onTouchedCallback();
		} else if (this.selectValue.fromDate && !this.selectValue.toDate && date && date.after(this.selectValue.fromDate)) {
			this.selectValue.toDate = date;
      this._onChangeCallback(this.selectValue);
      this._onTouchedCallback();
		} else {
			this.selectValue.toDate = null;
			this.selectValue.fromDate = date;
      this._onChangeCallback(this.selectValue);
      this._onTouchedCallback();
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.selectValue.fromDate && !this.selectValue.toDate && this.hoveredDate && date.after(this.selectValue.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.selectValue.toDate && date.after(this.selectValue.fromDate) && date.before(this.selectValue.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.selectValue.fromDate) ||
			(this.selectValue.toDate && date.equals(this.selectValue.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  handleKeyDown(event){
   return false
  }

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		let val = parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    return val
	}
}
