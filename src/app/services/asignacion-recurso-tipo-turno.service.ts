import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignacionRecursoTipoTurno } from '../modelo/asignacion-recurso-tipo-turno';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AsignacionRecursoTipoTurnoService {
  //link del json de las reservas
  private baseURL = "http://localhost:8080/api/v1/admin/asignar-recurso-a-tipo-turno";
  private baseURLget = "http://localhost:8080/api/v1/public/asignaciones";

  
  constructor(private httpClient:HttpClient, private serviceLogin:LoginService) {}

  //metodo para obtener los objetos AsignacionRecursoTipoTurno
  
  obtenerAsignaciones():Observable<AsignacionRecursoTipoTurno[]>{
    //const token = this.serviceLogin.getToken();
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<AsignacionRecursoTipoTurno[]>(`${this.baseURLget}`);//,{ headers });
  }


  //metodo para guardar AsignacionRecursoTipoTurno
  registrarAsignacion(asignacion:AsignacionRecursoTipoTurno):Observable<Object>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.baseURL}`,asignacion,{ headers });
  }

  editarAsignacion(asignacion:AsignacionRecursoTipoTurno):Observable<AsignacionRecursoTipoTurno>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<AsignacionRecursoTipoTurno>(`http://localhost:8080/api/v1/admin/datos-asignacion`,asignacion,{ headers });
  }

  guardarFeriado(asignaciones:number[],fecha:string){
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log("voy a enviar esto")
    console.log(asignaciones)
    return this.httpClient.post(`http://localhost:8080/api/v1/admin/registrar-feriado/`+fecha,asignaciones,{ headers });
  }
/*
  guardarDatosAsignacion(a:AsignacionRecursoTipoTurno):Observable<AsignacionRecursoTipoTurno>{
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<AsignacionRecursoTipoTurno>(`http://localhost:8080/api/v1/admin/datos-asignacion`,a,{ headers });
  }_*/




  //-------------------------CAMBIAR URLS---------------------------//
  asignarRecursoATiposDeTurno(idTipoTurno:number,recursos:number[]):Observable<Object>{
    //const token = this.serviceLogin.getToken();
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post('http://localhost:8080/api/v1/admin/tipos-de-turno/'+idTipoTurno+'/asignaciones',recursos/*,{ headers }*/);
  }


  asignarTiposDeTurnoARecurso(idRecurso:number,tiposDeTurno:number[]):Observable<Object>{
    //const token = this.serviceLogin.getToken();
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post('http://localhost:8080/api/v1/admin/recursos/'+idRecurso+'/asignaciones',tiposDeTurno/*,{ headers }*/);
  }
}
