import {Component, Input, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {UserService} from "../../../services/user-service/user.service";
import {Address} from "../../../models/Address";
import {NotificationService} from "../../../components/notification/notification.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.scss'],
})
export class AddAddressModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() idTrigger!: string;
  addr : Address = new Address();
  addAddressForm: FormGroup;

  constructor(private userService: UserService,
              private notification: NotificationService,
              private formBuilder: FormBuilder) {
    this.addAddressForm = this.formBuilder.group({
      'streetNumber': [null, [Validators.required]],
      'streetName': [null, [Validators.required]],
      'zipCode': [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'state': [null, [Validators.required]],
      'country': [null, [Validators.required]],
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {    
    this.userService.user.address = this.addr;
    const isAddressInserted: boolean = await this.userService.insertMyAddress(this.userService.user.address);
    if (isAddressInserted) {
      this.notification.notification('top', "Adresse entrée avec succès !")
      this.modal.dismiss(null, 'confirm');
    } else {
      this.notification.notification('top', "Problème d'insertion !")
    }
  }
}
