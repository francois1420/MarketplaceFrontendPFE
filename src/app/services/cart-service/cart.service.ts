import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../user-service/user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cart} from "../../models/Cart";
import { CartLine } from '../../models/CartLine';
import axios from 'axios';
import {environment} from "../../../environments/environment";
import {BaseItemService} from "../base-item-service/base-item.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = new Cart();
  amount: number = 0;
  cartHistory: Cart[] = [];
  constructor(private userService: UserService,
              private baseItemService: BaseItemService,
              private http: HttpClient) {
        this.refreshCart();
  }

  refreshCart() {
    this.http.get<Cart>(`${environment.apiURl}/api/cart/me`, {
      headers:{
        Authorization: `Bearer ${this.userService.userToken}`
      }
    }).subscribe(c=>{
      this.cart = c
      this.amount = this.getTotalAmount();
    });

    this.http.get<Cart[]>(`${environment.apiURl}/api/cart/me/history`, {
      headers:{
        Authorization: `Bearer ${this.userService.userToken}`
      }
    }).subscribe(c => {
      this.cartHistory = c
    });
  }

  buy() : void {
    this.http.post<void>(`${environment.apiURl}/api/cart/buy/success`, {}, {
      headers:{
        Authorization: `Bearer ${this.userService.userToken}`
      }
    }).subscribe(c => {
      this.refreshCart();
      this.baseItemService.refreshBaseItem();
    });
  }

  addItem(id_item: number){
    this.http.post<CartLine>(`${environment.apiURl}/api/cartline/` + id_item,{},
    {
      headers:{
        Authorization: `Bearer ${this.userService.userToken}`
      }
    }
    ).subscribe(res => this.refreshCart());
  }

  updateItem(id_item : number, quantity : number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',`Bearer ${this.userService.userToken}`);
    this.http.put<CartLine>(`${environment.apiURl}/api/cartline/` + id_item + "/" + quantity ,
      {}, {headers:headers}).subscribe(res=>this.refreshCart());

  }

  getTotalAmount(): number {
    let amount = 0;
    for (let cl of this.cart.cartLines) {
      amount += cl.item.price * cl.quantity
    }
    return amount;
  }

  getTotalAmountByCart(cart: Cart): number {
    let amount = 0;
    for (let cl of cart.cartLines) {
      amount += cl.item.price * cl.quantity
    }
    return amount;
  }

  async DeleteItem(idItem : number) {
    try {
      await axios.delete(`${environment.apiURl}/api/cartline/` + idItem, {
        headers:{
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });
      this.refreshCart();
    } catch (e) {
      throw Error;
    }
  }
}
