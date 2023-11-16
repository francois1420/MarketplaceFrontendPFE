import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsAdministrationPageRoutingModule } from './items-administration-routing.module';

import { ItemsAdministrationPage } from './items-administration.page';
import {AddBaseItemModalComponent} from "./add-base-item-modal/add-base-item-modal.component";
import {UpdateBaseItemModalComponent} from "./update-base-item-modal/update-base-item-modal.component";
import {AddItemModalComponent} from "./add-item-modal/add-item-modal.component";
import {UpdateItemModalComponent} from "./update-item-modal/update-item-modal.component";
import {ReactiveFormsModule} from "@angular/forms";

import { UcWidgetModule } from 'ngx-uploadcare-widget';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsAdministrationPageRoutingModule,
    UcWidgetModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ItemsAdministrationPage,
    AddBaseItemModalComponent,
    UpdateBaseItemModalComponent,
    AddItemModalComponent,
    UpdateItemModalComponent
  ]
})
export class ItemsAdministrationPageModule {}
