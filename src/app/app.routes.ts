import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Winner } from './pages/winner/winner';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '', component: Landing },
  { path: 'winner/:type', component: Winner },
];
