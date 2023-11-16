import {Component, Input, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import { UserService } from 'src/app/services/user-service/user.service';
import {User} from "../../../models/User";
import {Address} from "../../../models/Address";
import {NotificationService} from "../../../components/notification/notification.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"

@Component({
  selector: 'app-profile-modification-modal',
  templateUrl: './profile-modification-modal.component.html',
  styleUrls: ['./profile-modification-modal.component.scss'],
})
export class ProfileModificationModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() idTrigger!: string;
  profileForm: FormGroup;

  constructor(private userService: UserService,
              private notification: NotificationService,
              private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      'lastName': [null, [Validators.required]],
      'firstName': [null, [Validators.required]],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9]+(([.-_]?[a-zA-Z0-9]+)+)?)@(([a-zA-Z0-9]+[.-_])+[a-zA-Z]{2,4})$')])],
      'phoneNumber': [null, [Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]],
      'streetNumber': [null, [Validators.required]],
      'streetName': [null, [Validators.required]],
      'zipCode': [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'state': [null, [Validators.required]],
      'country': [null, [Validators.required]],
    })
  }

  getUser(): User {
    return this.userService.user;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    // if (this.profileForm.valid) {
      const user: User = this.userService.user;
      const address: Address = this.userService.user.address;

      const isAddressUpdated: boolean = await this.userService.updateMyAddress(address);
      if (!isAddressUpdated) await this.userService.insertMyAddress(address);

      const isUserUpdated: boolean = await this.userService.updateMe(user);
      if (isUserUpdated) {
        await this.notification.notification('top', "Informations mises à jour !");
        await this.modal.dismiss(null, 'confirm');
      } else {
        await this.notification.notification('top', "Email déjà utilisée !");
      }
    // }
  }
}
