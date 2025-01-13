import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Obtener los roles requeridos para la ruta
    const requiredRoles: string[] = route.data['roles'];

    // Obtener los roles del usuario desde las cookies
    const rolesString = this.cookieService.get('token_roles');
    if (!rolesString) {
      this.router.navigate(['/login']); // Redirigir si no hay roles
      return false;
    }

    const userRoles: string[] = JSON.parse(rolesString);

    // Verificar si el usuario tiene al menos uno de los roles requeridos
    const hasRole = requiredRoles.some(role => userRoles.includes(role));

    if (!hasRole) {
      this.router.navigate(['/error']); // Redirigir si no tiene los roles necesarios
      return false;
    }

    return true;
  }
}
