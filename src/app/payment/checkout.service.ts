import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reserva } from '../modelo/reserva';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private objeto = new Subject<Reserva>();
  objeto$ = this.objeto.asObservable();

  private baseURL="http://localhost:8080/mp"

  constructor(private httpClient:HttpClient, private serviceLogin:LoginService) { }

  //metodo para obtener los objetos Reserva
  obtenerLinkPagoPorId(idAsignacion:number):Observable<any>{
    //const token = this.serviceLogin.getToken();
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(`${this.baseURL}/createAndRedirect/${idAsignacion}`);
  }

  enviarObjeto(objeto: Reserva) {
    this.objeto.next(objeto);
    localStorage.removeItem('reserva')
    localStorage.setItem('reserva',JSON.stringify(objeto))
  }

  getObjeto():Observable<Reserva>{
    return JSON.parse(localStorage.getItem('reserva'));
  }
}