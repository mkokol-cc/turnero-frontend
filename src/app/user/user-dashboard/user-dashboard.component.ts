import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/modelo/reserva';
import { Usuario } from 'src/app/modelo/usuario';
import { LoginService } from 'src/app/services/login.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  reservasDeUsuario:Reserva[]=[];
  usuario:Usuario;
  modoEdicion:boolean=false;



  constructor(private reservaService:ReservaService,private loginService:LoginService,private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.obtenerReservasDeUsuario()
    this.obtenerUsuario();
  }

  obtenerUsuario(){
    this.loginService.getUser().subscribe(usuario => {
      this.usuario = usuario || new Usuario(); // asigna un nuevo objeto Usuario si usuario es nulo
    });
  }

  obtenerReservasDeUsuario(){
    this.reservaService.obtenerListaReservas().subscribe(dato=>{
      this.reservasDeUsuario=dato;
      //console.log(this.reservasDeUsuario)
    });
  }

  habilitarEdicion(aux:boolean){
    this.modoEdicion=aux;
  }

  actualizarLogueo(){
    let loginData={
      "username":this.usuario.username,
      "password":this.usuario.password
    }
    this.loginService.logout();
    this.loginService.generateToken(loginData).subscribe(
      (data:any) => {
        this.loginService.loginUser(data.token)
        this.loginService.getCurrentUser().subscribe((user:any)=>{
          this.loginService.setUser(user);
          this.obtenerUsuario();
          this.loginService.loginStatusSubject.next(true);
        })
      },(error) => {
        console.log(error);
      }
    )
  }

  guardarDatos(event: Event){
    event.preventDefault();
    this.usuarioService.registrarUsuario(this.obtenerDatosEditados()).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          //console.log('El usuario se registró correctamente.');
          // Aquí puedes realizar otras acciones para manejar la respuesta exitosa
        } else if (response.status === 401) {
          //console.log('No estás autorizado para realizar esta acción.');
          // Aquí puedes realizar otras acciones para manejar el error de autorización
        } else {
          //console.log('Ocurrió un error al registrar el usuario.');
          // Aquí puedes realizar otras acciones para manejar otros códigos de estado
        }
      },
      (error) => {
        console.log('Ocurrió un error al registrar el usuario.');
        // Aquí puedes realizar otras acciones para manejar el error
      }
    );
    this.actualizarLogueo();
    this.habilitarEdicion(false);
  }

  obtenerDatosEditados(){

    let nombre = document.getElementById("nombre-usuario") as HTMLInputElement;
    let apellido = document.getElementById("apellido-usuario") as HTMLInputElement;
    let email = document.getElementById("email-usuario") as HTMLInputElement;
    let telefono = document.getElementById("telefono-usuario") as HTMLInputElement;


    return {
      
        "id": this.usuario.id,
        "username": this.usuario.username,
        "password": this.usuario.password,
        "nombre": nombre.value,
        "apellido": apellido.value,
        "email": email.value,
        "telefono": telefono.value,
        "enabled": this.usuario.enabled,
        "perfil": this.usuario.perfil,
        "rol": {
          "id": 2,
          "rolNombre": "USER"
        },
        "comentarios": this.usuario.comentarios
       
      
    }


    
  }

}
