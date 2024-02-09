import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() locations: any []
  markerSelectIndex: number = null;

  lat = 30.7333;
  lng = 76.7794;
  zoom = 8;
  constructor(public router: Router) { }
  ngOnInit() {
    if(this.locations.length){
      this.lng = this.locations[0]?.coordinates[0]
      this.lat = this.locations[0]?.coordinates[1]
    }
  }

  onMarkerClick(index: number) {
    this.markerSelectIndex = index;
  }

  navigateTo(route,id){
    this.router.navigate([`/admin/${route}/${id}`])
  }
}
