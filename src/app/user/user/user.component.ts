import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UserGuard } from 'src/app/services/user.guard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  seRegistro:boolean=false;
  constructor(private loginService:LoginService, private userGuard:UserGuard) { }

  ngOnInit(): void {
    this.loginService.getUserRol().pipe(
      map(rol => {
        if (this.loginService.isLoggedIn() && rol === 'USER') {
          this.seRegistro=true;
        } else {
          this.seRegistro=false;
          this.loginService.logout();
        }
      })
    )
  }

  onButtonClicked() {
    this.seRegistro=true;
  }

}
