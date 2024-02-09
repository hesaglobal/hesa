import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ControlsModule } from '@app/controls/controls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InventoryRoutingModule } from './inventory-routing.module';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { ItemsComponent } from './items/items.component'
import { AddItemComponent } from './items/additem/additem.component';
import { AddItemWithAIComponent } from './items/additemwithai/additemwithai.component';
import { ContentComponent } from './items/additemwithai/content/content.component';

@NgModule({
  declarations: [
    CategoryComponent,
    SubcategoryComponent,
    ItemsComponent,
    AddItemComponent,
    AddItemWithAIComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    PerfectScrollbarModule,
    ControlsModule,
    HighchartsChartModule,
    ReactiveFormsModule,FormsModule,
    NgbPaginationModule
  ]
})
export class InventoryModule { }

