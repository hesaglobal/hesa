import { Component, Input, OnInit, ElementRef, forwardRef,NgZone} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-countrymultiselect',
  templateUrl: './countrymultiselect.component.html',
  styleUrls: ['./countrymultiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrymultiselectComponent),
      multi: true
    }
  ]
})
export class CountrymultiselectComponent implements OnInit, ControlValueAccessor {
  @Input() list: {}
  @Input() defaultvalue: string[]
  @Input() placeholder: string = "Select Values "
  @Input() types: string[] = ['country']
  @Input() options: any = {
    allowClear: true,
    closeOnSelect: false
  }
  private _selectValue: string[] = [];
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private select: any
  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private element: ElementRef<HTMLInputElement>) { }

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

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.select = $(this.element.nativeElement).find('select')
    this.select.select2({
      theme: 'bootstrap4',
      width: '100%',
      placeholder: this.placeholder,
      allowClear: this.options.allowClear,
      closeOnSelect: this.options.closeOnSelect,
      ajax: {
        url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
        data: function(params){
          var query = {
            q: 'in',
            _type: 'country',
            key:'AIzaSyBYvav8KrnaqX-9YOiz3pjMHzwa6VoJq_o'
          }

          return query;
        },
        processResults: function (data) {
          // Transforms the top-level key of the response object from 'items' to 'results'
          return {
            results: data
          };
        }
      }
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
    // $(this.element.nativeElement).find('input').keyup(function(e){
    //   self.getLocation(e.target.value)
    // });
  }

  getLocation(params, data) {
    let self = this
    this.mapsAPILoader.load().then(() => {
      var callback = function (predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        var data = $.map(predictions, function(item) {
          return {
            id: item.description,
            name: item.description
          }
        });
        self.list = data
      }
      let service = new google.maps.places.AutocompleteService () //(this.locationEle,{types: this.types});
      service.getPlacePredictions({ input: 'IN', types: this.types }, callback);
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }

      //     let country: string, state: string, city:string = ''
      //     place.address_components.forEach(address => {
      //       if (address.types.indexOf('country') >= 0)
      //         country = address.long_name
      //       else if (address.types.indexOf('administrative_area_level_1') >= 0)
      //         state = address.long_name
      //       else if (address.types.indexOf('locality') >= 0 || address.types.indexOf('administrative_area_level_2') >= 0)
      //         city = address.long_name;
      //     });

      //   });
      // });
    });
  }
  ngOnChanges() {
    this.select?.val(this.defaultvalue).trigger('change')
  }
}
