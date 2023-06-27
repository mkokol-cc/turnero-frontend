import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }


  public generateToken(loginData:any){
    //console.log(this.http.post(`https://localhost:8080/generate-token`,loginData));
    return this.http.post(`http://localhost:8080/generate-token`,loginData);
  }

  //iniciamos el token y lo guardamos en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token)
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token')
    if(tokenStr == undefined || tokenStr == null || tokenStr == ''){
      return false;
    }
    return true;
  }

  //cerrar sesion y eliminar token
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //obtenemos el usuario si no existe cerramos la sesion
  public getUser(): Observable<Usuario | null> {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr) as Usuario;
      return of(user);
    } else {
      this.logout();
      return of(null);
    }
  }

  public getUserRol(): Observable<string> {
    return this.getUser().pipe(
      map(user => {
        if (user && user.authorities) {
          const userAuthority = user.authorities.find(authority => authority.authority);
          return userAuthority ? userAuthority.authority : '';
        }
        return '';
      })
    );
  }



  public getCurrentUser(){
    return this.http.get(`http://localhost:8080/actual-usuario`);
  }

}
