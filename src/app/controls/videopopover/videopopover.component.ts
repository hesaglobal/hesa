import { Component, OnInit , Input , ViewEncapsulation} from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-videopopover',
  templateUrl: './videopopover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./videopopover.component.scss']
})
export class VideopopoverComponent implements OnInit {
  @Input() content: string
  @Input() title: string
  baseUrl = environment.Image_Base
  constructor() { }

  ngOnInit(): void {
  }

}
