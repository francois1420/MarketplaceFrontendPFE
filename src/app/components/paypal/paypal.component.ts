import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { CartService } from 'src/app/services/cart-service/cart.service';
import {Cart} from "../../models/Cart";
import {Router} from "@angular/router";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent {
  @Input() cart!: Cart;
  @Output() isBoughtEvent = new EventEmitter<boolean>();

  constructor(private cartService: CartService,
              private router: Router) {}

  ngOnChanges() {
    if (this.cartService.amount !== 0) {
      render(
        {
          id: "#myPaypalButtons",
          currency: "EUR",
          value: this.cartService.amount.toFixed(2).toString(),
          onApprove: (details) => {
            this.cartService.buy();
            this.isBoughtEvent.emit(true)
          },
        }
      );
    }
  }
}
