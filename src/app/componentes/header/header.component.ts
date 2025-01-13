import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/es';  // Asegúrate de importar el locale de español
import { AuthService } from '../../servicios/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  styles: ``,
})
export class HeaderComponent implements OnInit {

  hora: any;
  fecha: any;
  username:string = '';
  roles:string[]=[];
  perfil:string='';

  constructor(
    private authService:AuthService,
    private router: Router,
    private cookieService: CookieService
  ){  }

  ngOnInit(): void {
    this.getHoraActual();
    this.getFechaActual();
    this.username = this.getUsername();

  }




  getHoraActual() {
    this.hora = new Date(); // Inicializas la hora

    setInterval(() => {
      this.hora = new Date(); // Asignas la hora nuevamente dentro del setInterval
    }, 1000); // Esto actualiza la hora cada 1 segundo
  }

  getFechaActual() {
    dayjs.locale('es'); // Configurar idioma español

    // Obtener la fecha actual con dayjs
    let fecha = dayjs();

    // Formatear la fecha al formato deseado: "Lunes 30 de diciembre del 2024"
    this.fecha = fecha.format('dddd D [de] MMMM [del] YYYY');
  }

  getUsername():string{
    return this.username = this.authService.getUsernameFromCookie();
  }

  getSesion(){
    console.log("SI entra el cerrrar")
    this.authService.cerrarSesion();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }


  logout() {

    console.log('popo')
    // Mostrar la alerta de confirmación
    Swal.fire({
      title: '¿Realmente desea cerrar su sesión?',
      text: 'Tu sesión será cerrada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar datos de sesión y cookies
        localStorage.clear();
        this.cookieService.deleteAll();

        // Redirigir al login
        this.router.navigate(['/login']);
        console.log('Sesión cerrada');

      } else {
        console.log('Sesión no cerrada');
      }
    });
  }






}
