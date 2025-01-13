import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInterface } from '../interfaces/login-interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private _http: HttpClient) { }
  private url = "http://localhost:8095/auth/log-in";
    // Método para obtener el token
    getToken(modelo: LoginInterface): Observable<any> {
      return this._http.post<any>(`${this.url}`, modelo, {
        headers: { 'Content-Type': 'application/json' }
      });

    }

}
