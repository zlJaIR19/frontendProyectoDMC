import { Routes } from '@angular/router';

export const PRODUCTOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./producto-list/producto-list.component').then(m => m.ProductoListComponent)
  }
];
