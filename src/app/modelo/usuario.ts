import { ComentariosComponent } from "../user/comentarios/comentarios.component";
import { Comentario } from "./comentario";
import { Reserva } from "./reserva";

export class Usuario {
    /*

    id:number;
    username:string;
    password:string;
    nombre:string;
    apellido:string;
    email:string;
    telefono:string;
    enabled:boolean;
    perfil:string;
    comentarios:Comentario[];
    //authorities:any[];
*/

    id: number;
    username: string;
    password: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    enabled: boolean;
    perfil: string;
    rol: {
        id: number;
        rolNombre: string;
    };
    comentarios: any[];
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: {
        authority: string;
    }[];

    toJson(){
        return{
            "id": this.id,
            "username": this.username,
            "password": this.password,
            "nombre": this.nombre,
            "apellido": this.apellido,
            "email": this.email,
            "telefono": this.telefono,
            "enabled": this.enabled,
            "perfil": this.perfil,
            "rol": {
              "id": this.rol.id,
              "rolNombre": this.rol.rolNombre
            },
            "comentarios": this.comentarios
          }
    }
}
