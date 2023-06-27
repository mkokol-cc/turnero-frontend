import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private loginServie:LoginService, private router:Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginServie.getUserRol().pipe(
      map(rol => {
        if (this.loginServie.isLoggedIn() && rol === 'USER') {
          return true;
        } else {
          //this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
  
}
