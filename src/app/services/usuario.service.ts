import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient:HttpClient) { }
/*
  registrarUsuario(usuario:any):Observable<Object>{
    return this.httpClient.post(`http://localhost:8080/usuarios/editar`,usuario);
  }
*/
  registrarUsuario(usuario: any): Observable<HttpResponse<Object>> {
  return this.httpClient.post(`http://localhost:8080/usuarios/editar`, usuario, { observe: 'response' });
}

}
