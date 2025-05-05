import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { SelectUnitComponent } from './pages/select-unit/select-unit.component';
import { authGuard } from './auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { AlterPasswordComponent } from './pages/alter-password/alter-password.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { role: ['ADMIN', 'USER'] },
  },
  {
    path: 'admin',
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
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
    data: { role: ['ADMIN'] },
  },
  {
    path: 'alterpass',
    component: AlterPasswordComponent,
    canActivate: [authGuard],
    data: { role: ['ADMIN', 'USER'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'denied', component: AccessDeniedComponent },
  { path: '**', component: RedirectComponent },
];
