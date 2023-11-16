import {Component, Input, ViewChild} from '@angular/core';
import {BaseItem} from "../../../models/BaseItem";
import {IonModal, ToastController} from "@ionic/angular";
import {BaseItemService} from "../../../services/base-item-service/base-item.service";
import {NotificationService} from "../../../components/notification/notification.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"

@Component({
  selector: 'app-update-base-item-modal',
  templateUrl: './update-base-item-modal.component.html',
  styleUrls: ['./update-base-item-modal.component.scss'],
})
export class UpdateBaseItemModalComponent {
  @Input() baseItem!: BaseItem;
  @ViewChild(IonModal) modal!: IonModal;
  updateBaseItemForm: FormGroup;

  constructor(private baseItemService: BaseItemService,
              private notification: NotificationService,
              private formBuilder: FormBuilder) {
    this.updateBaseItemForm = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'description': [null, [Validators.required]]
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async modifyBaseItem() {
    const isUpdated: boolean = await this.baseItemService.updateBaseItem(this.baseItem);
    if (isUpdated) {
      await this.notification.notification('top', 'Item de base modifié !')
    } else {
      await this.notification.notification('top', 'Problème de modification !')
    }
  }
}
