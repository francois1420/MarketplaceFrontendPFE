import { Injectable } from '@angular/core';
import {Item} from "../../models/Item";
import axios from "axios";
import {UserService} from "../user-service/user.service";
import {ItemImage} from "../../models/ItemImage";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemImageService {

  constructor(private userService: UserService) { }

  async insertItemImage(itemImage: ItemImage): Promise<ItemImage> {
    try {
      const promiseToken = await axios.post(`${environment.apiURl}/api/itemimage`, itemImage, {
        headers:{
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });
      return promiseToken.data;
    } catch (e) {
      throw Error;
    }
  }

  async updateItemImage(itemImage: ItemImage): Promise<ItemImage> {
    try {
      const promiseToken = await axios.put(`${environment.apiURl}/api/itemimage/` + itemImage.idImage,
        itemImage, {
        headers:{
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });
      return promiseToken.data;
    } catch (e) {
      throw Error;
    }
  }
}
