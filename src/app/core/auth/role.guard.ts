import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Get the roles from route data
  const requiredRoles = route.data?.['roles'] as string[];
  
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }
  
  const currentUser = authService.getCurrentUser();
  
  if (currentUser && requiredRoles.includes(currentUser.rol)) {
    return true;
  }
  
  router.navigate(['/productos']);
  return false;
};
