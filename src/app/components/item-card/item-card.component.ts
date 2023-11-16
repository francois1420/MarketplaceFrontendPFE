import {Component, Input} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {CartLine} from "../../models/CartLine";
import {CartService} from "../../services/cart-service/cart.service";
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() isBasket!: boolean;
  @Input() cartLine!: CartLine;
  constructor(private cartService: CartService,
              private alertCtrl: AlertController,
              private notification: NotificationService) { }

  async showOptions(cartLine: CartLine) {
    const actionSheet = await this.alertCtrl.create({
      header: 'Modifier le produit',
      inputs: [
        {
          name: 'quantity',
          placeholder: cartLine.quantity.toString()
        }
      ],
      buttons: [
        {
          text: 'Supprimer le produit',
          handler: () => {
            this.cartService.DeleteItem(cartLine.idItem);
          }
        },
        {
          text: 'Modifier la quantité',
          handler: (data) => {
            if (data.quantity) {
              if (isNaN(data.quantity) || data.quantity < 0) {
                return this.notification.notification('top', 'Entrer une quantité valide')
              }
              if (cartLine.item.stock >= data.quantity) {
                return this.cartService.updateItem(cartLine.idItem, data.quantity);
              } else {
                return this.notification.notification('top', 'Stock insuffisant');
              }
            }
          }
        }
      ],
    });
    await actionSheet.present();
  }
}
