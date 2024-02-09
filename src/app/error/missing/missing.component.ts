import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['./missing.component.scss']
})
export class MissingComponent implements OnInit {

  constructor(private _location: Location) { }

  goBack() {
    this._location.back();
  }

  ngOnInit(): void {
  }

}
