import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imagepopover',
  templateUrl: './imagepopover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./imagepopover.component.scss']
})
export class ImagepopoverComponent implements OnInit {
  @Input() content: string
  @Input() title: string
  baseUrl = environment.Image_Base
  constructor() { }

  ngOnInit(): void {
  }

}
