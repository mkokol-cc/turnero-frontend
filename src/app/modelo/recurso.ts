import { AsignacionRecursoTipoTurno } from "./asignacion-recurso-tipo-turno";
import { Empresa } from "./empresa";
import { Horario } from "./horario";
import { HorarioEspecial } from "./horario-especial";
import { Reserva } from "./reserva";
import { TipoTurno } from "./tipo-turno";

export class Recurso {
    id: number;
    descripcion: string;
    nombre: string;
    recursosTipoTurno: AsignacionRecursoTipoTurno[];
    horarioEspecial: HorarioEspecial[];
    horarios: Horario[];
    eliminado: boolean;
    //concurrente: boolean;
    //cantidadConcurrencia: number;
}
