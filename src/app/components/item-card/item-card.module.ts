import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {ItemCardComponent} from "./item-card.component";

@NgModule({
  declarations: [ItemCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ],
  exports: [
    ItemCardComponent
  ]
})
export class ItemCardModule { }
