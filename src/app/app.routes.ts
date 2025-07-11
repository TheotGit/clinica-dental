// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login';
import { HomeComponent } from './home';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];


