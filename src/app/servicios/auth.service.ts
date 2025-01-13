import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }
// Método para mostrar el SweetAlert
cerrarSesion(): void {
  Swal.fire({
    title: '¿Realmente desea cerrar su sesión?',
    text: 'Tu sesión será cerrada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // Lógica para cerrar sesión

      this.cookieService.deleteAll();
      window.location.href="/login";
      console.log('Cerrar sesión');
      // Aquí puedes agregar la lógica para cerrar sesión, como limpiar cookies o redirigir a una página de login
    } else {

      console.log('Cancelado');


    }
  });
}


  getId(){
    this.cookieService.get('token')
  }


  getUsernameFromCookie(): string {
    const username = this.cookieService.get('token_username'); // Usando el nombre correcto de la cookie

    return username;
  }





}
