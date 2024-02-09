import { Component, OnInit ,EventEmitter,Output,Input} from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  @Input() hidePreLoader : boolean=true; 
  constructor() { }

  ngOnInit(): void {
    
  }
}
