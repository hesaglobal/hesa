import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-uploadInventory',
  templateUrl: './uploadInventory.component.html',
  styleUrls: ['./uploadInventory.component.scss']
})
export class UploadInventoryComponent implements OnInit {
  hesaathis: any = []
  collectionSize: number;
  page = 1
  pageSize = 50;  
  private subs = new SubSink()
  constructor( public router: Router,public dataService: DataService,) { }

  ngOnInit(): void {
    
  }

}
