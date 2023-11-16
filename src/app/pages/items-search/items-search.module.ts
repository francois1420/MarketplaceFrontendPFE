import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsSearchPageRoutingModule } from './items-search-routing.module';

import { ItemsSearchPage } from './items-search.page';

import { ItemListModule } from '../../components/item-list/item-list.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsSearchPageRoutingModule,
    ItemListModule
  ],
  declarations: [ItemsSearchPage]
})
export class ItemsSearchPageModule {}
