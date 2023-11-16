import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsSearchPage } from './items-search.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsSearchPageRoutingModule {}
