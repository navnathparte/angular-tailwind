import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Winner } from './pages/winner/winner';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'winner/:type', component: Winner },
];
