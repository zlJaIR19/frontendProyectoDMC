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
  
  // Check if user has any of the required roles (case-insensitive)
  if (currentUser) {
    const userRole = currentUser.rol.toLowerCase();
    const hasRequiredRole = requiredRoles.some(role => role.toLowerCase() === userRole);
    
    if (hasRequiredRole) {
      return true;
    }
  }
  
  router.navigate(['/productos']);
  return false;
};
