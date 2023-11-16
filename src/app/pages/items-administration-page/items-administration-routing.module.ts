import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsAdministrationPage } from './items-administration.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsAdministrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsAdministrationPageRoutingModule {}
