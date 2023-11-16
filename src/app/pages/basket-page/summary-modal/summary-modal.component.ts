import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {CartService} from "../../../services/cart-service/cart.service";
import {UserService} from "../../../services/user-service/user.service";
import {NotificationService} from "../../../components/notification/notification.service";

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss'],
})
export class SummaryModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() idTrigger!: string;

  constructor(private cartService: CartService,
              private notification: NotificationService,
              private userService: UserService) {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  getCart() {
    return this.cartService.cart;
  }

  getUser() {
    return this.userService.user;
  }

  isBought(isBought: boolean) {
    if (isBought) {
      this.notification.notification('top', 'Merci pour votre achat ! ' +
        'Les informations de votre commande se trouvent dans votre profil !')
    } else {
      this.notification.notification('top', 'votre achat n\'a pas pu être effectué !')
    }
    this.modal.dismiss(null, 'confirm');
  }
}
