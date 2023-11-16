import {Component, Input, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {Register} from "../../../models/Register";
import {UserService} from "../../../services/user-service/user.service";
import {NotificationService} from "../../../components/notification/notification.service";
import {CartService} from "../../../services/cart-service/cart.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() idTrigger!: string;
  register: Register = new Register();
  registerForm: FormGroup;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private cartService: CartService,
              private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      'lastName': [null, [Validators.required]],
      'firstName': [null, [Validators.required]],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9]+(([.-_]?[a-zA-Z0-9]+)+)?)@(([a-zA-Z0-9]+[.-_])+[a-zA-Z]{2,4})$')])],
      'password': [null, [Validators.required]],
    })
  }

  async sign() {
    const isInserted: boolean = await this.userService.register(this.register);

    if (isInserted) {
      this.cartService.refreshCart();
      await this.notificationService.notification('top', "Vous êtes à présent inscrit !");
      await this.modal.dismiss(null, 'confirm');
    } else {
      await this.notificationService.notification('top', "Erreur d'insertion !");
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
