import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfilePageRoutingModule } from './profile-routing.module';
import {ProfileCardComponent} from "./profile-card/profile-card.component";
import {LoginModalComponent} from "./login-modal/login-modal.component";
import {RegisterModalComponent} from "./register-modal/register-modal.component";
import {SettingsModalComponent} from "./settings-modal/settings-modal.component";
import {ProfileModificationModalComponent} from "./profile-modification-modal/profile-modification-modal.component";
import {OrdersModalComponent} from "./orders-modal/orders-modal.component";
import {ItemCardModule} from "../../components/item-card/item-card.module";
import {
  ItemListPurchaseModule
} from "../../components/item-list-purchase/item-list-purchase.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    ItemCardModule,
    ItemListPurchaseModule
  ],
  declarations: [
    ProfilePage,
    ProfileCardComponent,
    LoginModalComponent,
    RegisterModalComponent,
    SettingsModalComponent,
    ProfileModificationModalComponent,
    OrdersModalComponent
  ]
})
export class ProfileModule {}
