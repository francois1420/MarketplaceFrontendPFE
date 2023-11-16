import { Component, OnInit } from '@angular/core';
import { BaseItemService } from 'src/app/services/base-item-service/base-item.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { Category } from '../../models/Category';
import {Router} from "@angular/router";
import {BaseItem} from "../../models/BaseItem";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  nbDisplayedItem : number = 2;
  isAllItemDisplayed: boolean = false;
  search : string = "";

  constructor(private serviceBaseItem: BaseItemService,
              private serviceCategory : CategoryService,
              private router: Router) {}

  getCategories() : Category[] {
    return this.serviceCategory.categories;
  }

  getBaseItems(): BaseItem[] {
    return this.serviceBaseItem.baseItems;
  }

  onSearchbarEnter() {
    this.router.navigateByUrl('/tabs/items-search?nameOrDescription=' + this.search);
    this.search = '';
  }
}


