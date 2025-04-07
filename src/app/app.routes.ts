import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { SelectUnitComponent } from './pages/select-unit/select-unit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeAdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'select', component: SelectUnitComponent },
];
