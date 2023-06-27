import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recurso } from '../modelo/recurso';
import { TipoTurno } from '../modelo/tipo-turno';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  //link del json de las reservas
  private baseURL = "http://localhost:8080/api/v1/admin/recursos";
  private baseURLget = "http://localhost:8080/api/v1/public/recursos";
  
  constructor(private httpClient:HttpClient, private serviceLogin:LoginService) {}

  //metodo para obtener los objetos Reserva
  obtenerRecursos():Observable<Recurso[]>{
    return this.httpClient.get<Recurso[]>(`${this.baseURLget}`);
  }

  obtenerRecursosPorTipoTurno(id:number):Observable<Recurso[]>{
    return this.httpClient.get<Recurso[]>(`${this.baseURLget}/tipo-turno-`+id);
  }

  //metodo para guardar recursos
  registrarRecurso(recurso:Recurso):Observable<Object>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.baseURL}`,recurso,{ headers });
  }

  //metodo para editar eliminado-nombre-decripcion de los recursos solamente
  editarDatosRecurso(recurso:Recurso):Observable<Object>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.baseURL}-edit`,recurso,{ headers });
  }

  
  setHabilitado(id:number,b:boolean):Observable<Object>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    const body = { "eliminado": b }; // Se define el objeto JSON que se enviará como body
    return this.httpClient.post(`${this.baseURL}/${id}/eliminado`,body,{ headers });
  }
  

}
