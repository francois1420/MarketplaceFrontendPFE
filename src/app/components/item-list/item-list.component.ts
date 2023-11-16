import { Component, Input, OnInit } from '@angular/core';
import { BaseItem } from 'src/app/models/BaseItem';
import {BaseItemService} from "../../services/base-item-service/base-item.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input() allItems!: BaseItem[];
  nbDisplayedItem : number = 6;
  isAllItemDisplayed: boolean = false;

  getFactionnalItem() {
    this.isAllItemDisplayed = this.nbDisplayedItem >= this.allItems.length;
    return this.allItems.slice(0, this.nbDisplayedItem);
  }

  getMore() : void {
    this.nbDisplayedItem += 4;
  }
}
