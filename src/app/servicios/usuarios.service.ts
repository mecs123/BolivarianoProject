import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthCreateUserRequest } from '../interfaces/request/AuthCreateUserRequest';
import { AuthResponse } from '../interfaces/response/AuthResponse';
import { AuthEditarUserRequest } from '../interfaces/request/AuthEditarUserRequest';
import { UserResponse } from '../interfaces/response/UserResponse';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor(private _http:HttpClient ) { }

  getAllUsuarios(): Observable<any> {
    return this._http.get(`${environment.api}/all`).pipe(
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        return throwError(() => new Error('Error al obtener usuarios'));
      })
    );
  }

  getAllRoels(): Observable<any> {
    return this._http.get(`${environment.api}/roles`).pipe(
      catchError((error) => {
        console.error('Error al obtener roles:', error);
        return throwError(() => new Error('Error al obtener usuarios'));
      })
    );
  }


   // Método para registrar un nuevo usuario

   register(modelo: any): Observable<any> {
    return this._http.post(`${environment.api}/sign-up`, modelo, {
      headers: { 'Content-Type': 'application/json' },
    });
  }



  // Método para editar un usuario (como ejemplo)
  editUser(userRequest: any): Observable<UserResponse> {
    const url = `http://localhost:8095/auth/edit/${userRequest.id}`;
  return this._http.put<any>(url, userRequest, {
    headers: { 'Content-Type': 'application/json' }
  });

}

delete(id: number): Observable<any> {
  const url = `http://localhost:8095/auth/delete/${id}`;
  return this._http.delete<any>(url, {
    headers: { 'Content-Type': 'application/json' }
    });
}

getUserById(id:any): Observable<any> {
  return this._http.get(`${environment.api}/byId/${id}`).pipe(
    catchError((error) => {
      console.error('Error al obtener usuarios:', error);
      return throwError(() => new Error('Error al obtener usuarios'));
    })
  );
}






}
