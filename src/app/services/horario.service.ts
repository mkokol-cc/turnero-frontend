import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../modelo/horario';
import { HorarioEspecial } from '../modelo/horario-especial';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private baseURLpublic = "http://localhost:8080/api/v1/public";
  private baseURLadmin = "http://localhost:8080/api/v1/admin";

  constructor(private httpClient:HttpClient, private serviceLogin:LoginService) {}

  obtenerHorarioDeAsignacion(id:number):Observable<Horario[]>{
    return this.httpClient.get<Horario[]>(`${this.baseURLpublic}/horarios-asignacion/`+id,);
  }

  obtenerHorarioDeAsignacionDiaEspecifico(id:number,dia:string):Observable<HorarioEspecial[]>{
    return this.httpClient.get<HorarioEspecial[]>(`${this.baseURLpublic}/horarios-asignacion/`+id+`/`+dia,);
  }

  setHorariosAsignacion(idAsignacion:number,horarios:any[]){
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.baseURLadmin}/horarios-asignacion/`+idAsignacion,horarios,{ headers });
  }

  setHorariosEspeciales(idAsignacion:number,horarios:any[]){
    const token = this.serviceLogin.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.baseURLadmin}/horarios-especiales-asignacion/`+idAsignacion,horarios,{ headers });
  }



  getHorariosDisponiblesAsig(idAsig:number,fecha:string):Observable<any[]>{//dd-MM-yyyy
    return this.httpClient.get<any[]>(`${this.baseURLpublic}/horarios-disponibles-asignacion/${idAsig}/${fecha}`,);
  }

}
