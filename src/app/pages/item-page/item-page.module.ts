import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPagePageRoutingModule } from './item-page-routing.module';

import { ItemPagePage } from './item-page.page';
import {ItemListModule} from "../../components/item-list/item-list.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemPagePageRoutingModule,
    ItemListModule
  ],
  declarations: [ItemPagePage]
})
export class ItemPagePageModule {}
