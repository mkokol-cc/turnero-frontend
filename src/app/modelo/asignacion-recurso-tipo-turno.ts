import { Horario } from "./horario";
import { HorarioEspecial } from "./horario-especial";
import { Recurso } from "./recurso";
import { Reserva } from "./reserva";
import { TipoTurno } from "./tipo-turno";

export class AsignacionRecursoTipoTurno {
    id: number;
    recurso: Recurso;
    tipoTurno: TipoTurno;
    horarios: Horario[];
    horariosEspeciales: HorarioEspecial[];
    concurrente: boolean;
    cantidadConcurrencia: number;
    simultaneos: AsignacionRecursoTipoTurno[];
    reservas:Reserva;
    eliminado:boolean;

    senia:number;
    duracionEnMinutos:number;
    precioDesde:number;
    precioHasta:number;
  }
