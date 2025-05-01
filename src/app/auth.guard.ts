import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SessionService } from './services/session/session-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const sessionService = inject(SessionService);
  const token = sessionService.get('token');
  const requiredRoles = route.data?.['role'] as string[];

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  const decodedToken = authService.decodeToken();
  if (!decodedToken) {
    sessionStorage.removeItem('token');
    return router.createUrlTree(['/login']);
  }

  const isExpired = decodedToken.exp * 1000 < Date.now();
  if (isExpired) {
    console.log('expirado');
    sessionStorage.removeItem('token');
    return router.createUrlTree(['/login']);
  }

  const userRole = decodedToken.role;
  if (requiredRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/denied']);
};
