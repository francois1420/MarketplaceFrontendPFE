import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BaseItem } from 'src/app/models/BaseItem';
import {CartLine} from "../../models/CartLine";
import { CartService } from 'src/app/services/cart-service/cart.service';
import {Cart} from "../../models/Cart";

@Component({
  selector: 'app-item-list-purchase',
  templateUrl: './item-list-purchase.component.html',
  styleUrls: ['./item-list-purchase.component.scss'],
})
export class ItemListPurchaseComponent {

  @Input() cart!: Cart;
  @Input() buttonText!: string;
  @Input() isSummary: boolean = false;

  constructor(private router: Router,
              private cartService: CartService,) {}

  getAmount() {
    return this.cartService.getTotalAmountByCart(this.cart);
  }
}
