  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import Swal from 'sweetalert2';
  import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
  import { CookieService } from 'ngx-cookie-service';

  import { TokenService } from '../../servicios/token.service';
  import { LoginInterface } from '../../interfaces/login-interface';
  import { Router } from '@angular/router';
  import { CommonModule } from '@angular/common';


  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, NgxSpinnerModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {

    user_login = {
      username: '',
      password: ''
    };

    constructor(
      private tokenService: TokenService,
      private cookieService: CookieService,
      private router: Router,
      private spinner: NgxSpinnerService

    ) { }

    // Método para mostrar el spinner
    mostrarSpinner(): void {
      this.spinner.show();
    }

    // Método para ocultar el spinner
    ocultarSpinner(): void {
      this.spinner.hide();
    }

    // Lógica de la función enviar
    enviar(): void {
      // Verificar si los campos están vacíos
      if (this.user_login.username === '' || this.user_login.password === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos vacíos',
          text: 'Por favor, complete ambos campos.'
        });
        return;
      }

      const logingData: LoginInterface = {
        username: this.user_login.username,
        password: this.user_login.password
      };

      // Hacer la solicitud al backend para obtener el token
      this.tokenService.getToken(logingData).subscribe({
        // Mostrar el spinner cuando se hace la solicitud
        next: (response) => {
          this.mostrarSpinner();

          // Establecer los cookies con el token y el nombre de usuario
          this.cookieService.set('token', response.token, {
            expires: 7, // Días de expiración
            path: '/',  // Disponible en todas las rutas
          });
          this.cookieService.set('token_username', response.username, {
            expires: 7, // Días de expiración
            path: '/',  // Disponible en todas las rutas
          });

          const roles = response.roles
          this.cookieService.set('token_roles', JSON.stringify(roles), {
            expires: 7, // Días de expiración
            path: '/',  // Disponible en todas las rutas
          });

          this.router.navigate(['/home']); // Navegar al Home
            this.ocultarSpinner();  // Ocultar el spinner después del redireccionamiento
        },
        error: (error) => {
          console.error('Error de autenticación', error);
          Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña inválidos',
            text: 'Por favor, verifica tus credenciales e intenta nuevamente.'
          });
          this.ocultarSpinner(); // Ocultar spinner en caso de error
        }
      });

      // Si la solicitud está tomando tiempo, puedes mostrar el spinner antes de que empiece la llamada
      this.mostrarSpinner();
    }
  }
