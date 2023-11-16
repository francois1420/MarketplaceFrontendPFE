import {Component, Input, ViewChild} from '@angular/core';
import {AlertController, IonModal} from "@ionic/angular";
import {BaseItem} from "../../../models/BaseItem";
import {Category} from "../../../models/Category";
import {BaseItemService} from "../../../services/base-item-service/base-item.service";
import {CategoryService} from "../../../services/category-service/category.service";
import {NotificationService} from "../../../components/notification/notification.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"
import { PhotoService } from 'src/app/services/upload-photo-service/photo.service';

@Component({
  selector: 'app-add-base-item-modal',
  templateUrl: './add-base-item-modal.component.html',
  styleUrls: ['./add-base-item-modal.component.scss'],
})
export class AddBaseItemModalComponent {
  @ViewChild(IonModal) modalAddBaseItem!: IonModal;
  @Input() idTrigger!: string;
  baseItem: BaseItem = new BaseItem();
  addBaseItemForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private alertController: AlertController,
              private baseItemService: BaseItemService,
              private notification: NotificationService,
              private formBuilder: FormBuilder,
              private photoService: PhotoService) {
    this.addBaseItemForm = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'description': [null, [Validators.required]]
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Ajouter une nouvelle catégorie',
      buttons: [{
        text: 'OK',
        handler: data => {
          if (data[0] !== "" && data[1] !== "") {
            const name: string = data[0];
            const urlImage: string = data[1];
            this.categoryService.insertCategory({idCategory: 0, name: name, urlImage: urlImage})
          } else {
            this.notification.notification('top', 'Veuillez entrer un nom et une URL pour l\'image');
          }
        }
      }],
      inputs: [
        {
          placeholder: 'Nom de la catégorie'
        },
        {
          placeholder: 'URL de l\'image'
        }
      ],
    });
    await alert.present();
  }

  getAllCategory(): Category[] {
    return this.categoryService.getAllCategory();
  }

  onCategoryChange(e: any) {
    this.baseItem.idCategory = e.detail.value;
  }

  cancel() {
    this.modalAddBaseItem.dismiss(null, 'cancel');
  }

  async addBaseItem() {
    const isInserted: boolean = await this.baseItemService.addBaseItem(this.baseItem);
    if (isInserted) {
      this.baseItem = new BaseItem();
      await this.notification.notification('top', 'Item inséré !');
      await this.modalAddBaseItem.dismiss(null, 'confirm');
    } else {
      await this.notification.notification('top', 'Problème d\'insertion !');
    }
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();   
  }
}