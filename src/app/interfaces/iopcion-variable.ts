import { Recurso } from "../modelo/recurso";
import { TipoTurno } from "../modelo/tipo-turno";

export interface IOpcionVariable {
    tipoTurno: TipoTurno;
    recurso: Recurso;
}