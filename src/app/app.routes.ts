import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/guestbook/home/home')
        .then(m => m.Home)
  }
];
