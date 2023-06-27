import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../modelo/estado';
import { Reserva } from '../modelo/reserva';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {


  //link del json de las reservas
  private baseURL = "http://localhost:8080/api/v1/admin/reservas";
  private urlPublic = "http://localhost:8080/api/v1/public/reserva";
  private urlAdmin = "http://localhost:8080/api/v1/admin/reserva";
  private urlEstados = "http://localhost:8080/api/v1/admin/estados";
  private urlEstadosPublic = "http://localhost:8080/api/v1/public/estados";

  private urlCambiarEstado = "http://localhost:8080/api/v1/public/reserva/{id}/cambiar-estado";


  constructor(private httpClient:HttpClient, private serviceLogin:LoginService) {}

  //metodo para obtener los objetos Reserva
  obtenerListaReservas():Observable<Reserva[]>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Reserva[]>(`${this.baseURL}`,{ headers });
  }

  //metodo regstrar reserv a
  registrarReserva(reserva:Reserva):Observable<Object>{
    return this.httpClient.post(`${this.urlPublic}`,reserva);
  }

  //metodo regstrar reserva admin
  registrarReservaAdmin(reserva:Reserva):Observable<Object>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.urlAdmin}`,reserva,{ headers });
  }

/*
  getEstados():Observable<Estado[]>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Estado[]>(`${this.urlEstados}`,{ headers });
  }
*/
  getEstados():Observable<Estado[]>{
    //const token = this.serviceLogin.getToken();
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Estado[]>(`${this.urlEstadosPublic}`);
  }


  setEstadoReserva(idReserva:number,idEstado:number):Observable<Object>{
    return this.httpClient.post(`${this.urlPublic}/`+idReserva+`/cambiar-estado`,idEstado);
  }

}
