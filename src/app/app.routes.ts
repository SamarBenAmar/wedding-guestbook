import { Routes } from '@angular/router';
import {Home} from './features/guestbook/home/home';
import {Souvenir} from './features/guestbook/souvenir/souvenir';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'guestbook',
    pathMatch: 'full'
  },
  {
    path: 'guestbook',
    component: Home
  },
  {
    path: 'guestbook/add-souvenir',
    component: Souvenir
  }
];
