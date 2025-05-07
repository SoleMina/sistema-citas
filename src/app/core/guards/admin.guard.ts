import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getUserRole().pipe(
    map((role) => {
      console.log(role, 'role en guard');
      if (role === 'ADMINISTRADOR') {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    })
  );
};
