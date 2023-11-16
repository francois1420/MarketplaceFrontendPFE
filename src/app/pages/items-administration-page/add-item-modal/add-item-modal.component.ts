import {Component, Input, ViewChild} from '@angular/core';
import {AlertController, IonModal} from "@ionic/angular";
import {BaseItem} from "../../../models/BaseItem";
import {NotificationService} from "../../../components/notification/notification.service";
import {Item} from "../../../models/Item";
import {ItemService} from "../../../services/item-service/item.service";
import {ItemImageService} from "../../../services/item-image-service/item-image.service";
import {ItemImage} from "../../../models/ItemImage";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"
import { PhotoService } from 'src/app/services/upload-photo-service/photo.service';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss'],
})
export class AddItemModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() idTrigger!: string;
  @Input() baseItem!: BaseItem;
  item:Item = new Item();
  addItemForm: FormGroup;

  constructor(private alertController: AlertController,
              private notification: NotificationService,
              private itemService: ItemService,
              private itemImageService: ItemImageService,
              private formBuilder: FormBuilder,
              private photoService: PhotoService) {
    this.addItemForm = this.formBuilder.group({
      'price': [null, [Validators.required]],
      'stock': [null, [Validators.required]],
      'color': [null, [Validators.required]],
      'size': [null, [Validators.required]],
    })
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

  removeItemImage(indexItemImage: number) {
    this.item.itemImages.splice(indexItemImage, 1)
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async addItem() {
    if (this.item.price > 0 && this.item.stock >= 0 && this.item.itemImages.length > 0) {

      this.item.idBaseItem = this.baseItem.idBaseItem;
      const item: Item = await this.itemService.insertItem(this.item);

      for (let image of this.item.itemImages) {
        image.idItem = item.idItem;
        const itemImage: ItemImage = await this.itemImageService.insertItemImage(image);
        item.itemImages.push(itemImage);
      }

      this.baseItem.items.push(item);
      this.item = new Item();
      await this.notification.notification('top', 'Item inséré !');
      await this.modal.dismiss(null, 'confirm');
    } else {
      await this.notification.notification('top', 'Veuillez entrer des attributs valides !');
    }
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
    const isMain: boolean = this.item.itemImages.length === 0;
      this.item.itemImages.push({idImage: 0, isMain: isMain, urlImage: this.photoService.photosURL[this.photoService.photosURL.length-1], idItem: 0});        
  }
}
