import { Injectable } from '@angular/core';
import {Login} from "../../models/Login";
import axios from "axios";
import {Item} from "../../models/Item";
import {BaseItemService} from "../base-item-service/base-item.service";
import {UserService} from "../user-service/user.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private baseItemService: BaseItemService,
              private userService: UserService) { }

  async insertItem(item: Item): Promise<Item> {
    try {
      const promiseToken = await axios.post(`${environment.apiURl}/api/item`, item, {
        headers:{
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });

      return promiseToken.data
    } catch (e) {
      throw Error;
    }
  }

  async updateItem(item: Item): Promise<boolean> {
    try {
      const promiseToken = await axios.put(`${environment.apiURl}/api/item/` + item.idItem,
        item, {
        headers:{
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });

      return promiseToken.status === 200;
    } catch (e) {
      throw false;
    }
  }
}
