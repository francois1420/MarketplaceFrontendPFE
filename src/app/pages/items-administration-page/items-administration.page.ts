import {Component} from '@angular/core';
import {BaseItemService} from "../../services/base-item-service/base-item.service";
import {BaseItem} from "../../models/BaseItem";

@Component({
  selector: 'app-items-administration',
  templateUrl: './items-administration.page.html',
  styleUrls: ['./items-administration.page.scss'],
})
export class ItemsAdministrationPage {

  constructor(private baseItemService: BaseItemService) {}

  getAllBaseItems(): BaseItem[] {
    return this.baseItemService.getAllBaseItems();
  }
}
