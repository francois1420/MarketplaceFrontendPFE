import {Component, Input, ViewChild} from '@angular/core';
import {IonModal, AlertController } from "@ionic/angular";
import {UserService} from "../../../services/user-service/user.service";
import {Login} from "../../../models/Login";
import {NotificationService} from "../../../components/notification/notification.service";
import {CartService} from "../../../services/cart-service/cart.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() idTrigger!: string;
  login: Login = new Login();
  loginForm: FormGroup

  constructor(private userService : UserService,
              private notificationService: NotificationService,
              private cartService: CartService,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9]+(([.-_]?[a-zA-Z0-9]+)+)?)@(([a-zA-Z0-9]+[.-_])+[a-zA-Z]{2,4})$')])],
      'password': [null, [Validators.required]],
    })
  }

  async connect() {
    const isLog: boolean = await this.userService.login(this.login);
    if (isLog) {
      this.cartService.refreshCart();
      await this.notificationService.notification('top', "Vous êtes connecté !");
      await this.modal.dismiss(null, 'confirm');
    } else {
      await this.notificationService.notification('top', "Email ou mot de passe incorrect !");
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
