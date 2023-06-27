import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../modelo/comentario';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  //link del json de las reservas
  private baseURL = "http://localhost:8080/api/v1/public/comentarios";

  constructor(private httpClient:HttpClient, private serviceLogin:LoginService) {}

  //metodo para obtener los objetos Comentario
  obtenerComentarios():Observable<Comentario[]>{
    //const token = this.serviceLogin.getToken();
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Comentario[]>(`${this.baseURL}`/*,{ headers }*/);
  }

  //metodo regstrar Comentario
  registrarComentario(comentario:Comentario):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,comentario);
  }

  registrarRespuesta(comentario: Comentario, id: number): Observable<Object> {
    let options = { params: { numero: id.toString() } };
    return this.httpClient.post(`${this.baseURL}`, comentario, options);
  }
}
