import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemListPurchaseComponent } from './item-list-purchase.component';
import { RouterLink } from '@angular/router';
import {ItemCardModule} from "../item-card/item-card.module";



@NgModule({
  declarations: [
    ItemListPurchaseComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    ItemCardModule
  ],
  exports: [
    ItemListPurchaseComponent
  ]
})
export class ItemListPurchaseModule { }
