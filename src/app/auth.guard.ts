import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const requiredRole = route.data?.['role'] as string[];

  if (token) {
    if (requiredRole.includes(role || '')) {
      return true;
    } else {
      router.navigate(['danied']);
      return false;
    }
  }
  return router.createUrlTree(['login']);
};
