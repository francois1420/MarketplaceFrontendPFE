import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BaseItem } from '../../models/BaseItem';
import { Category } from '../../models/Category';
import {Location} from '@angular/common';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { BaseItemService } from 'src/app/services/base-item-service/base-item.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.page.html',
  styleUrls: ['./item-category.page.scss'],
})
export class ItemCategoryPage implements OnInit {
  category: Category = new Category();
  search : string = "";
  items : BaseItem[] = [];
  itemsToShow : BaseItem[]=[];
  colors : Set<string> = new Set();
  sizes : Set<string> = new Set();
  selectedSize : string ="";
  selectedColor : string =  "";

  constructor(private serviceCategory: CategoryService,
              private serviceBaseItem : BaseItemService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {}

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.serviceCategory.getCategoryWithId(id).subscribe(c => {
        this.category = c
        this.getItemCategory();
      })
    }
  }

  getItemCategory() : void {
    this.serviceBaseItem.getBaseItemsWithCategory(this.category.idCategory.toString()).subscribe(
      items=>{
        this.items = items;
        this.itemsToShow = items;
        this.initColorAndSizeFilter(items);
      })
  }

  initColorAndSizeFilter(items: BaseItem[]){
    items.forEach(e=>{
      if(e.items.length>0){
        e.items.forEach(a=>{
          if(a.color!=undefined){
            this.colors.add(a.color);
          }
          if(a.size!=undefined){
            this.sizes.add(a.size)
          }
        })
      }
    })
  }

  searchItemsWithFilters(size: string, color: string) : Set<BaseItem> {
    let sortedList : Set<BaseItem> = new Set();
    if(size=="" && color !=""){
      this.items.forEach(e=>{
        e.items.forEach(a=>{
          if(a.color==color){
            sortedList.add(e);
          }
        });
      });
    }
    else if(size!="" && color==""){
      this.items.forEach(e=>{
        e.items.forEach(a=>{
          if(a.size==size){
            sortedList.add(e);
          }
        });
      });
    }
    else {
      this.items.forEach(e=>{
        e.items.forEach(a=>{
          if(a.color==color && a.size == size){
            sortedList.add(e);
          }
        });
      });
    }
    return sortedList;
  }

  onChangeSize(ev: any){
    this.selectedSize = ev.target.value;
    this.itemsToShow =  [];
    this.searchItemsWithFilters(this.selectedSize, this.selectedColor).forEach(e=>this.itemsToShow.push(e));

  }

  onChangeColor(ev: any){
    this.selectedColor = ev.target.value;
    this.itemsToShow =  [];
    this.searchItemsWithFilters(this.selectedSize,this.selectedColor).forEach(e=>this.itemsToShow.push(e));
  }

  goBack() : void {
    this.location.back();
  }

  onSearchbarEnter() {
    this.router.navigateByUrl('/tabs/items-search?nameOrDescription=' + this.search
      + '&category=' + this.category.idCategory);
    this.search = '';
  }
}
