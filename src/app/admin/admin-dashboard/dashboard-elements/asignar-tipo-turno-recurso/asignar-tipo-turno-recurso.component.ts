import { Component, OnInit } from '@angular/core';
import { IOpcionVariable } from 'src/app/interfaces/iopcion-variable';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { Recurso } from 'src/app/modelo/recurso';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { RecursoService } from 'src/app/services/recurso.service';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';
import { forkJoin } from 'rxjs';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';

@Component({
  selector: 'app-asignar-tipo-turno-recurso',
  templateUrl: './asignar-tipo-turno-recurso.component.html',
  styleUrls: ['./asignar-tipo-turno-recurso.component.css']
})
export class AsignarTipoTurnoRecursoComponent implements OnInit {

  listaChbxRecursos:any[];
  listaChbxTipoTurno:any[];
  //----------------------
  listaChbx:any[]=[];
  seleccion:IOpcionVariable;
  constructor(private recursoService:RecursoService, private tipoTurnoService:TipoTurnoService,
    private asignacionService:AsignacionRecursoTipoTurnoService) {}

  ngOnInit(): void {
  }

  getRecurso(tipoTurno:TipoTurno){
    forkJoin([
      this.recursoService.obtenerRecursos(),
      this.recursoService.obtenerRecursosPorTipoTurno(tipoTurno.id)
    ]).subscribe(([recursosCompletos, recursosPorTipoTurno]) => {
      const selectedItems = recursosCompletos.map(item => {
        return {
          id: item.id,
          nombre: item.nombre,
          seleccionado: recursosPorTipoTurno.some(recurso => recurso.id === item.id)
        };
      });
      this.listaChbx = selectedItems;
    });
  }

  getTipoTurno(recurso: Recurso) {
    forkJoin([
      this.tipoTurnoService.obtenerTiposDeTurno(),
      this.tipoTurnoService.obtenerTipoTurnoPorRecurso(recurso.id)
    ]).subscribe(([tiposCompletos, tiposPorRecurso]) => {
      const selectedItems = tiposCompletos.map(item => {
        return {
          id: item.id,
          nombre: item.nombre,
          seleccionado: tiposPorRecurso.some(tipo => tipo.id === item.id)
        };
      });
      this.listaChbx = selectedItems;
    });
  }

  onButtonClick(seleccionDelHijo: IOpcionVariable) {
    if(seleccionDelHijo.tipoTurno){
      this.seleccion=seleccionDelHijo;
      this.getRecurso(seleccionDelHijo.tipoTurno)
    }else if(seleccionDelHijo.recurso){
      this.seleccion=seleccionDelHijo;
      this.getTipoTurno(seleccionDelHijo.recurso)
    }else{
      alert("HUBO UN PROBLEMA AL CARGAR LOS DATOS")
    }
  }

  onSubmit(){
    let asignaciones=this.crearAsignaciones()
    //if(asignaciones.length != 0){
      if(this.seleccion.recurso!=null){
        console.log("VOY A ENVIAR ESTO: "+asignaciones)
        this.asignacionService.asignarTiposDeTurnoARecurso(this.seleccion.recurso.id,asignaciones).subscribe(obj=>{
          console.log(obj);
        })
      }else if(this.seleccion.tipoTurno!=null){
        console.log("VOY A ENVIAR ESTO: "+asignaciones)
        this.asignacionService.asignarRecursoATiposDeTurno(this.seleccion.tipoTurno.id,asignaciones).subscribe(obj=>{
          console.log(obj);
        })
      }
    //}
  }

  crearAsignaciones():number[]{
    let asignaciones:number[]=[];
    if(this.listaChbx.length>0){
      this.listaChbx.forEach(item => {
        if (item.seleccionado) {
          asignaciones.push(item.id)
        }
      });
    }
    return asignaciones;
  }
}
