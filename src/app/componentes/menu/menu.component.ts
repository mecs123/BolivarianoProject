import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent  implements OnInit  {

  roles: string[] = [];
  isAdmin: boolean = false;
  isEstudiante: boolean = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    // Obtener los roles desde las cookies
    this.roles = this.getShowRoleActive()
  }

  getShowRoleActive() {
    const roles = this.cookieService.get('token_roles');
    if (roles) {
      const roleNames: string[] = JSON.parse(roles); // Convertir el string de roles a un arreglo

      roleNames.forEach((role: string) => { // Usar roleNames aquí
        switch (role) {
          case 'ADMIN':
            this.isAdmin = true;
            break;
          case 'STUDENT':
            this.isEstudiante = true;
            break;
          default:
            // Caso para roles desconocidos o no manejados
            console.log(`Rol no manejado: ${role}`);
            break;
        }
      });

      return roleNames; // Devolver el arreglo de roles procesados
    }

    return []; // Retornar un arreglo vacío si no hay roles
  }

}
