import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'p/:slug',
    loadComponent: () => import('../pages/viewer/viewer.component').then((m) => m.ViewerComponent),
  },
  { path: '**', redirectTo: '' },
];
