import { Component, Input, OnInit, ElementRef, forwardRef, Output,EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {
  @Input() list: {}
  @Input() defaultvalue: string[];
  @Output() onblurEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() placeholder: string = "Select Values"
  @Input() options: any = {
    allowClear: true,
    closeOnSelect: false
  }
  private _selectValue: string[] = [];
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private select: any
  constructor(private element: ElementRef) { }

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
      $(this.select).addClass('disabled')
    } else {
      $(this.select).removeClass('disabled')
    }
  }

  get selectValue(): any {
    return this._selectValue
  }

  set selectValue(value: any) {
    this.defaultvalue = value
    this._onChangeCallback(value);
    this._onTouchedCallback();
  }
  handleBlurEvent() {
    this.onblurEvent.emit();
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.select = $(this.element.nativeElement).find('select')
    this.select.select2({
      theme: 'bootstrap4',
      width: '100%',
      placeholder: this.placeholder,
      allowClear: this.options.allowClear,
      closeOnSelect: this.options.closeOnSelect
    });

    let self = this

    this.select.on('select2:select', function (e) {
      let data = e.params.data;
      self.defaultvalue = self.defaultvalue || []
      if (!data.disabled && data.selected) {
        self.defaultvalue.push(data.id)
        self.selectValue = self.defaultvalue
        self._onChangeCallback(self.defaultvalue);
        self._onTouchedCallback();
      }
    });

    this.select.on('select2:unselect', function (e) {
      let data = e.params.data;
      if (!data.disabled && !data.selected) {
        let index = self.defaultvalue.findIndex(item => item === data.id)
        if (index >= 0) {
          self.defaultvalue.splice(index, 1)
          self._onChangeCallback(self.defaultvalue);
          self._onTouchedCallback();
        }
      }
    });
    this.select.on('select2:close', function (e) {
      self.handleBlurEvent();
    });
  }
  ngOnChanges() {
    setTimeout(() => {
      this.select?.val(this.defaultvalue).trigger('change')
    }, 100);
    
  }
}
