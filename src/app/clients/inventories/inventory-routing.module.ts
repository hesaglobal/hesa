import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { ItemsComponent } from './items/items.component';
import { AddItemComponent } from './items/additem/additem.component';
import { AddItemWithAIComponent } from './items/additemwithai/additemwithai.component';
import { ContentComponent } from './items/additemwithai/content/content.component';


const routes: Routes = [
  {
    path: "",
    component: CategoryComponent,
    pathMatch:'full'
  },
  {
    path: "category",
    component: CategoryComponent,
    pathMatch:'full'
  },
  {
    path: "subcategory",
    component: SubcategoryComponent,
    pathMatch:'full'
  },
  {
    path: "items",
    component: ItemsComponent,
    pathMatch:'full'
  },
  {
    path: "items/add",
    component: AddItemComponent,
    pathMatch:'full'
  },
  {
    path: "items/edit/:id",
    component: AddItemComponent,
    pathMatch:'full'
  },
  {
    path: "items/add/ai",
    component: AddItemWithAIComponent,
    pathMatch:'full'
  },
  {
    path: "items/ai/:ondcId",
    component: ContentComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
