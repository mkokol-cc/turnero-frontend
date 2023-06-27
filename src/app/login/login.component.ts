import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() buttonClicked = new EventEmitter();
  
  loginData={
    "username":"",
    "password":""
  }

  constructor(private service:LoginService) { }

  ngOnInit(): void {
  }

  ngSubmit(){
    console.log(this.loginData)
    if(this.loginData.password.trim() != "" && this.loginData.username.trim() != ""){
      this.service.generateToken(this.loginData).subscribe(
        (data:any) => {
          console.log(data);

          this.service.loginUser(data.token)
          this.service.getCurrentUser().subscribe((user:any)=>{
            this.service.setUser(user);
            console.log(user);
            if(this.service.getUserRol().pipe(map(rol => rol === "ADMIN"))){
              //dashboard admin
              window.location.href='/admin';
              this.service.loginStatusSubject.next(true);
            }
            else if(this.service.getUserRol().pipe(map(rol => rol === "USER"))){
              //dashboard user
              this.buttonClicked.emit();
              //window.location.href='/user';
              this.service.loginStatusSubject.next(true);
            }else{
              this.service.logout();
            }
          })
        },(error) => {
          console.log(error);
        }
      )
    }else{
      console.log("error: usuario o contraseña incorrecta");
    }
  }

}
