import { Component, Input, OnInit, ElementRef, forwardRef, NgZone, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Location, Locality } from '@app/models/location'
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationComponent),
      multi: true
    }
  ]
})
export class LocationComponent implements OnInit, ControlValueAccessor {
  @Input() value: Location
  @Input() types: string[] = []
  @Input() placeholder: string = "Search location"
  locationEle: HTMLInputElement
  private _selectValue: Location = {
    locationName: '',
    locality: {
      type: 'Point',
      coordinates: [0, 0],
    },
    city: '',
    state: '',
    country: ''
  }

  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  private input: any

  locality: Locality = {
    type: 'Point',
    coordinates: [0, 0],
  };

  constructor(private mapsAPILoader: MapsAPILoader,
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
    this.locationEle = $(this.element.nativeElement).find('input').get(0)
  }

  ngAfterViewInit(): void {
    this.getLocation()
    this.locationEle.addEventListener("change", (e: Event) => {
      if (e.target['value'].trim() === '') {
       this.selectValue = { locationName: '', locality: this.locality, city: '', state: '', country: '' }
      }
    })

  }

  getLocation() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.locationEle, { types: this.types });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          let country: string, state: string, city: string = ''
          place.address_components.forEach(address => {
            if (address.types.indexOf('country') >= 0)
              country = address.long_name
            else if (address.types.indexOf('administrative_area_level_1') >= 0)
              state = address.long_name
            else if (address.types.indexOf('locality') >= 0 || address.types.indexOf('administrative_area_level_2') >= 0)
              city = address.long_name;
          });

          this.locality = {
            type: "Point",
            coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
          }
          this.selectValue = { locationName: place.formatted_address, locality: this.locality, city, state, country  }
        });
      });
    });
  }

}
