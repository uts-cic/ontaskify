import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'canvas',
  },
  {
    path: 'canvas',
    loadChildren: () => import('./canvas/routes'),
  },
] as Routes;
