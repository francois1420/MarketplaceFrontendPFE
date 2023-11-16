import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasketPage } from './basket.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { BasketPageRoutingModule } from './basket-routing.module';
import { ItemListModule } from '../../components/item-list/item-list.module';
import { ItemListPurchaseModule } from '../../components/item-list-purchase/item-list-purchase.module';
import {ItemCardModule} from "../../components/item-card/item-card.module";
import {SummaryModalComponent} from "./summary-modal/summary-modal.component";
import {PaypalComponent} from "../../components/paypal/paypal.component";
import {AddAddressModalComponent} from "./add-address-modal/add-address-modal.component";
import {ReactiveFormsModule} from "@angular/forms"

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BasketPageRoutingModule,
    ItemListModule,
    ItemListPurchaseModule,
    ItemCardModule,
    ReactiveFormsModule,
  ],
  declarations: [
    BasketPage,
    SummaryModalComponent,
    PaypalComponent,
    AddAddressModalComponent
  ]
})
export class BasketPageModule {}
