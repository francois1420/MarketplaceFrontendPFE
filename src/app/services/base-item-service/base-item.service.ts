import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { BaseItem } from 'src/app/models/BaseItem';
import { UserService } from '../user-service/user.service';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseItemService {
  baseItems: BaseItem[] = [];

  constructor(private http:HttpClient, private userService : UserService) {
    this.refreshBaseItem();
  }
  getBaseItemsWithCategory(id: string) : Observable<BaseItem[]> {
    return this.http.get<BaseItem[]>(`${environment.apiURl}/api/baseitem?category=` + id );
  }
  getSearchItems(search_param: string, category_param: string){
    if(search_param!=undefined&&category_param!=undefined){
      return this.http.get<BaseItem[]>(`${environment.apiURl}/api/baseitem`,{
        params:{
          category: category_param,
          nameOrDescription:search_param
        }
      });
    }
    return this.http.get<BaseItem[]>(`${environment.apiURl}/api/baseitem`,{
      params:{
        nameOrDescription:search_param
      }
    });
  }

  getBaseItems() : Observable<BaseItem[]> {
    return this.http.get<BaseItem[]>(`${environment.apiURl}/api/baseitem`);
  }

  getBaseItem(id: string) : Observable<BaseItem>{
    return this.http.get<BaseItem>(`${environment.apiURl}/api/baseitem/` + id);
  }

  getSimilarItems(id: number) : Observable<BaseItem[]> {
    return this.http.get<BaseItem[]>(`${environment.apiURl}/api/baseitem?category=` + id)
  }

  refreshBaseItem() {
    this.http.get<BaseItem[]>(`${environment.apiURl}/api/baseitem` )
      .subscribe(bI => this.baseItems = bI)
  }

  getAllBaseItems() : BaseItem[] {
    return this.baseItems;
  }

  async addBaseItem(baseItem: BaseItem) : Promise<boolean> {
    try {
      const promiseInsert = await axios.post(`${environment.apiURl}/api/baseitem`, baseItem, {
        headers:{
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });

      if (promiseInsert.status !== 201) return false;

      this.refreshBaseItem();
      return true;
    } catch (e) {
      return false;
    }
  }

  async updateBaseItem(baseItem: BaseItem) : Promise<boolean> {
    try {
      const promiseInsert = await axios.put(`${environment.apiURl}/api/baseitem/` + baseItem.idBaseItem,
        baseItem, {
        headers:{
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });

      if (promiseInsert.status !== 200) return false;

      // this.refreshBaseItem();
      return true;
    } catch (e) {
      return false;
    }
  }

}
