import {Component, Input, ViewChild} from '@angular/core';
import {AlertController, IonModal} from "@ionic/angular";
import {Item} from "../../../models/Item";
import {ItemService} from "../../../services/item-service/item.service";
import {NotificationService} from "../../../components/notification/notification.service";
import {ItemImageService} from "../../../services/item-image-service/item-image.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"

@Component({
  selector: 'app-update-item-modal',
  templateUrl: './update-item-modal.component.html',
  styleUrls: ['./update-item-modal.component.scss'],
})
export class UpdateItemModalComponent {
  @Input() item!: Item;
  @ViewChild(IonModal) modal!: IonModal;
  updateItemForm: FormGroup;

  constructor(private alertController: AlertController,
              private itemService: ItemService,
              private notification: NotificationService,
              private itemImageService: ItemImageService,
              private formBuilder: FormBuilder) {
    this.updateItemForm = this.formBuilder.group({
      'price': [null, [Validators.required]],
      'stock': [null, [Validators.required]],
      'color': [null, [Validators.required]],
      'size': [null, [Validators.required]],
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async addItemImageAlert() {
    const alert = await this.alertController.create({
      header: 'Ajouter une nouvelle image',
      buttons: [{
        text: 'OK',
        handler: data => {
          if (data[0] !== "") {
            const urlImage: string = data[0];
            const isMain: boolean = this.item.itemImages.length === 0;
            this.item.itemImages.push({idImage: 0, isMain: isMain, urlImage: urlImage, idItem: 0})
          } else {
            this.notification.notification('top', 'Veuillez entrer une URL pour l\'image');
          }
        }
      }],
      inputs: [
        {
          placeholder: 'URL de l\'image'
        }
      ],
    });
    await alert.present();
  }

  async modifyItem() {
    const isItemUpdated: boolean = await this.itemService.updateItem(this.item);
    if (isItemUpdated) {
      for (let image of this.item.itemImages) {
        if (image.idImage === 0) {
          image.idItem = this.item.idItem;
          await this.itemImageService.insertItemImage(image);
        }
      }
      await this.notification.notification('top', 'Item modifié !');
      this.modal.dismiss(null, 'confirm');
    } else {
      await this.notification.notification('top', 'Problème avec la modification !');
    }
  }
}
