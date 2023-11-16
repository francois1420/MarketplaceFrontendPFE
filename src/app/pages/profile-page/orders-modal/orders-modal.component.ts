import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OverlayEventDetail} from "@ionic/core/components";
import {IonModal} from "@ionic/angular";
import {CartService} from "../../../services/cart-service/cart.service";
import {Cart} from "../../../models/Cart";

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.scss'],
})
export class OrdersModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() idTrigger!: string;

  constructor(private cartService : CartService) {}

  getHistory(): Cart[] {
    return this.cartService.cartHistory;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }
}
