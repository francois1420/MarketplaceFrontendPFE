import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemCategoryPageRoutingModule } from './item-category-routing.module';

import { ItemCategoryPage } from './item-category.page';

import { ItemListModule } from '../../components/item-list/item-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemCategoryPageRoutingModule,
    ItemListModule
  ],
  declarations: [ItemCategoryPage]
})
export class ItemCategoryPageModule {}
