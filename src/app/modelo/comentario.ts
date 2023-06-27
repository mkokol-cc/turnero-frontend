import { Usuario } from "./usuario";

export class Comentario {
    id: number;
  hora: string;
  fecha: string;
  comentario: string;
  usuario: Usuario;
  respuesta:Comentario;
}
