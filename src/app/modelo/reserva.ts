import { Time } from "@angular/common";
import { AsignacionRecursoTipoTurno } from "./asignacion-recurso-tipo-turno";
import { Estado } from "./estado";
import { Recurso } from "./recurso";
import { Reservante } from "./reservante";
import { TipoTurno } from "./tipo-turno";
import { Usuario } from "./usuario";

export class Reserva {/*
    id:number;
    fecha:string;
    hora:Time;
    estado:Estado;
    recurso:Recurso;
    tipoTurno:TipoTurno;
    usuario:Usuario;*/

    id: number;
    tipoReserva: string;
    estado: Estado;
    fecha: Date;
    hora: string;
    nota: string;
    reservante: Reservante;
    asignacion: AsignacionRecursoTipoTurno;
}
