import {Component} from '@angular/core';
import { Location } from '@angular/common';
import {UserService} from "../../services/user-service/user.service";
import {CartService} from "../../services/cart-service/cart.service";
import { Router } from '@angular/router';
import {BaseItemService} from "../../services/base-item-service/base-item.service";

@Component({
  selector: 'app-basket-page',
  templateUrl: 'basket.page.html',
  styleUrls: ['basket.page.scss']
})
export class BasketPage {

  constructor(private location: Location,
              public userService: UserService,
              private cartService: CartService,
              private baseItemService: BaseItemService) {}

  getCart() {
    return this.cartService.cart;
  }

  isConnected() {
    return this.userService.userToken !== null;
  }

  getAllBaseItem() {
    return this.baseItemService.baseItems;
  }

  isAddressComplete() {
    return this.userService.user.address.streetName !== '';
  }
}
