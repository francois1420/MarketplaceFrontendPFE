import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ItemListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ],
  exports:[
    ItemListComponent
  ]
})
export class ItemListModule { }
