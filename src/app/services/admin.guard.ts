import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginServie:LoginService, private router:Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginServie.getUserRol().pipe(
      map(rol => {
        if (this.loginServie.isLoggedIn() && rol === 'ADMIN') {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      })
    );
  }
  
}
