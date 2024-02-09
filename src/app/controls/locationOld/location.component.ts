import { Component, ViewEncapsulation, OnInit, Input, NgZone, ElementRef, EventEmitter, Output } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Location, Locality } from '../../models/location'

@Component({
  selector: 'app-locationold',
  templateUrl: './location.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./location.component.scss']
})
export class LocationOldComponent implements OnInit {
  @Output() locationData = new EventEmitter<any>();
  @Input() value = ''
  @Input() types: string[] = []
  @Input() placeholder: string = "Search location"
  locationEle: HTMLInputElement

  locality: Locality = {
    type: 'Point',
    coordinates: [0, 0],
  };

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private element: ElementRef<HTMLInputElement>
  ) { }

  ngOnInit(): void {
    this.locationEle = $(this.element.nativeElement).find('input').get(0)
  }

  ngAfterViewInit(): void {
    this.getLocation()
    this.locationEle.addEventListener("change", (e: Event) => {
      if(e.target['value'].trim()=== '') {
        this.locationData.emit({ location: '', locality: this.locality, city: '', state:'', country: '' });
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
          this.locationData.emit({ location: place.formatted_address, locality: this.locality, city, state, country });
        });
      });
    });
  }
}
