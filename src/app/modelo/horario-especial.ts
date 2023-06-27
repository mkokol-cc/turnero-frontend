import { AsignacionRecursoTipoTurno } from "./asignacion-recurso-tipo-turno";
import { Recurso } from "./recurso";

export class HorarioEspecial {
    id: number;
    desde: string;
    hasta: string;
    fecha: string;
    feriado:boolean;
    motivo:string;
    asignacionTiposTurno: AsignacionRecursoTipoTurno[];
    recursos: Recurso[];
}
