import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home-page/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'basket',
        loadChildren: () => import('../pages/basket-page/basket.module').then(m => m.BasketPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile-page/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'item-page/:id',
        loadChildren: () => import('../pages/item-page/item-page.module').then(m => m.ItemPagePageModule)
      },
      {
        path: 'item-category/:id',
        loadChildren: () => import('../pages/item-category-page/item-category.module').then(m => m.ItemCategoryPageModule)
      },
      {
        path: 'items-search',
        loadChildren: () => import('../pages/items-search/items-search.module').then( m => m.ItemsSearchPageModule)
      },
      {
        path: 'items-administration',
        loadChildren: () => import('../pages/items-administration-page/items-administration.module').then( m => m.ItemsAdministrationPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
