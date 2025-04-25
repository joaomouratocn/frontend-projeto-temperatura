import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { SelectUnitComponent } from './pages/select-unit/select-unit.component';
import { authGuard } from './auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { role: ['ADMIN', 'USER'] },
  },
  {
    path: 'home',
    component: HomeAdminComponent,
    canActivate: [authGuard],
    data: { role: ['ADMIN'] },
  },
  {
    path: 'select',
    component: SelectUnitComponent,
    canActivate: [authGuard],
    data: { role: ['ADMIN'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'danied', component: AccessDeniedComponent },
];
