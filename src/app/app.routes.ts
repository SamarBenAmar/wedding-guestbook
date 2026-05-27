import { Routes } from '@angular/router';
import {Home} from './features/guestbook/home/home';
import {Souvenir} from './features/guestbook/souvenir/souvenir';
import {LivreDor} from './features/guestbook/livre-dor/livre-dor';

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
  },
  {
    path: 'guestbook/livre-dor',
    component: LivreDor
  }
];
