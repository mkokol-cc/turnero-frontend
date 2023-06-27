import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent implements OnInit {

  asignacion:AsignacionRecursoTipoTurno;
  constructor() { }

  ngOnInit(): void {
  }

  recibirDato(a:AsignacionRecursoTipoTurno){
    this.asignacion=a;
  }

}
