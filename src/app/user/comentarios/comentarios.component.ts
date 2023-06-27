import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/modelo/comentario';
import { Usuario } from 'src/app/modelo/usuario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  listaComentarios:Comentario[]=[];

  constructor(private loginService:LoginService, private comentarioService:ComentarioService) { }

  ngOnInit(): void {
    this.getComentarios();
    console.log(this.loginService.getToken())
  }


  modoRespuesta(id:number){
    let elementos = document.querySelectorAll('.respuesta-form') as NodeListOf<HTMLDivElement>;
    elementos.forEach(elemento => {
      elemento.style.display = "none";
    });
    let comentario = document.getElementById("respuesta-div-"+id) as HTMLDivElement;
    comentario.style.display = "block";
  }

  getComentarios():void{
    this.listaComentarios=[];
    this.comentarioService.obtenerComentarios().subscribe(dato=>{
      this.listaComentarios=dato;
      console.log(this.listaComentarios)
    });
  }

  publicarComentario(respuesta:number){
    if(respuesta!=-1){
      this.comentarioService.registrarRespuesta(this.crearComentario(respuesta),respuesta).subscribe(dato=>{
        console.log(dato);
        this.getComentarios();
      },(error)=>{
        console.log(error);
      })
    }else{
      this.comentarioService.registrarComentario(this.crearComentario(respuesta)).subscribe(dato=>{
        console.log(dato);
        this.getComentarios();
      },(error)=>{
        console.log(error);
      })
    }
  }

  crearComentario(respuesta:number):any{
    var today = new Date();
    let fechaActual = new Date();
    let usuarioActual = new Usuario();
    this.loginService.getUser().subscribe(usuario => {
      usuarioActual = usuario; // asigna un nuevo objeto Usuario si usuario es nulo
    });
    let comentarioHtml = document.getElementById("comentario-input") as HTMLInputElement;
   if(respuesta!=-1){
    comentarioHtml = document.getElementById("respuesta-input-"+respuesta) as HTMLInputElement;
   }
    return {
      
        "fecha": fechaActual.toLocaleDateString('en-GB').replace('/','-').replace('/','-'),
        "hora": today.toLocaleTimeString('en-GB'),
        "usuario": {
          "id": usuarioActual.id,
          "username": usuarioActual.username,
          "password": usuarioActual.password,
          "nombre": usuarioActual.nombre,
          "apellido": usuarioActual.apellido,
          "email": usuarioActual.email,
          "telefono": usuarioActual.telefono,
          "enabled": usuarioActual.enabled,
          "perfil": usuarioActual.perfil,
          "rol": {
            "id": 2,
            "rolNombre": "USER"
          },
          "comentarios": usuarioActual.comentarios
        },
        "comentario": comentarioHtml.value,
        "respuesta": null
    }
  }
  

}
