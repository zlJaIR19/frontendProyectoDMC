import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'ordenes',
    pathMatch: 'full'
  },
  {
    path: 'ordenes',
    loadComponent: () => import('./orden-list/orden-list.component').then(m => m.OrdenListComponent)
  },
  {
    path: 'ordenes/:id',
    loadComponent: () => import('./orden-detail/orden-detail.component').then(m => m.OrdenDetailComponent)
  }
];
