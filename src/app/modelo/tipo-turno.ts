import { AsignacionRecursoTipoTurno } from "./asignacion-recurso-tipo-turno";
import { Empresa } from "./empresa";
import { Horario } from "./horario";
import { Recurso } from "./recurso";
import { Reserva } from "./reserva";


export class TipoTurno {
    id: number;
    duracionEnMinutos: number;
    eliminado: boolean;
    nombre: string;
    descripcion: string;
    precioEstimado: string;
    seniaMontoEnCtvos: number;
    //recursosTipoTurno: Recurso[];
    recursosTipoTurno: AsignacionRecursoTipoTurno[];
  }
