import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const requiredRoles = route.data?.['roles'] as string[];
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const hasRole = requiredRoles.some(role => 
    authService.hasRole(role)
  );

  if (!hasRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
