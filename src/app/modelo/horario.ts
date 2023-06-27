import { Time } from "@angular/common";
import { AsignacionRecursoTipoTurno } from "./asignacion-recurso-tipo-turno";
import { Dia } from "./dia";
import { Recurso } from "./recurso";
import { TipoTurno } from "./tipo-turno";

export class Horario {
    id: number;
    desde: string; // Puedes usar 'string' en lugar de 'Time'
    hasta: string; // Puedes usar 'string' en lugar de 'Time'
    dia: Dia;
    asignacionTiposTurno: AsignacionRecursoTipoTurno[];
    recursos: Recurso[];
}
