import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TipoTurno } from '../modelo/tipo-turno';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TipoTurnoService {
  //link del json de las reservas
  private baseURL = "http://localhost:8080/api/v1/public/tipos-de-turno";
  private baseURLpost = "http://localhost:8080/api/v1/admin/tipos-de-turno";
  constructor(private httpClient:HttpClient,private serviceLogin:LoginService) {}

  //metodo para obtener los objetos Reserva
  obtenerTiposDeTurno():Observable<TipoTurno[]>{
    //const token = this.serviceLogin.getToken();
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<TipoTurno[]>(`${this.baseURL}`);//,{ headers });
  }

  guardarTipoTurno(tipoturno:TipoTurno):Observable<TipoTurno>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<TipoTurno>(`${this.baseURLpost}`,tipoturno,{ headers });
  }

  obtenerTipoTurnoPorRecurso(id:number):Observable<TipoTurno[]>{
    return this.httpClient.get<TipoTurno[]>(`${this.baseURL}/recurso-`+id);
  }



  setHabilitado(id:number,b:boolean):Observable<Object>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    const body = { "eliminado": b }; // Se define el objeto JSON que se enviará como body
    return this.httpClient.post(`${this.baseURLpost}/${id}/eliminado`,body,{ headers });
  }
}
