import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BaseItem } from 'src/app/models/BaseItem';
import { BaseItemService } from 'src/app/services/base-item-service/base-item.service';

@Component({
  selector: 'app-items-search',
  templateUrl: './items-search.page.html',
  styleUrls: ['./items-search.page.scss'],
})
export class ItemsSearchPage implements OnInit {

  searchParam : string = "";
  categoryParam : string = "";
  itemList : BaseItem[] = [];
  searchParamHistory: string[] = [];

  constructor(private serviceBaseItem: BaseItemService,
              private route : ActivatedRoute,
              private location : Location,
              private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.searchParam = params['nameOrDescription'];
        this.categoryParam = params['category'];
        this.searchParamHistory.push(this.searchParam);
      }
    )
    this.getSearchItems();
  }

  onSearchbarEnter() {
    let url: string = '/tabs/items-search?nameOrDescription=' + this.searchParam
    if (this.categoryParam) url += '&category=' + this.categoryParam;
    this.router.navigateByUrl(url)
    this.getSearchItems();
  }

  getSearchItems() : void {
    this.serviceBaseItem.getSearchItems(this.searchParam, this.categoryParam).subscribe(
        items => {
          this.itemList = items;
        }
    )
  }

  goBack() : void {
    if(this.searchParamHistory.length > 0)
      this.searchParamHistory.pop();

    this.location.back();
    this.searchParam = this.searchParamHistory[this.searchParamHistory.length - 1];
    this.itemList = [];
    this.getSearchItems();
  }

}
