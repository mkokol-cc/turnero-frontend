import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';

@Component({
  selector: 'app-tabla-asignaciones',
  templateUrl: './tabla-asignaciones.component.html',
  styleUrls: ['./tabla-asignaciones.component.css']
})
export class TablaAsignacionesComponent implements OnInit {

  @Output() asignacionElegida = new EventEmitter<AsignacionRecursoTipoTurno>();
  asignaciones:AsignacionRecursoTipoTurno[]=[];
  divs:any[] = [];
  modoAgregarTipoTurno:number;
  asignacionSeleccionado:number;

  constructor(private asignacionService:AsignacionRecursoTipoTurnoService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAsignaciones();
    this.enviarAsignacion(null);
  }

  getAsignaciones(){
    this.asignacionService.obtenerAsignaciones().subscribe(obj=>{
      this.asignaciones=obj;
      const recursosTemp = [];
      this.asignaciones.forEach(asignacion => {
        const recursoId = asignacion.recurso.id;
        const recursoIndex = recursosTemp.findIndex(r => r.id === recursoId);
        if (recursoIndex !== -1) {
          recursosTemp[recursoIndex].asignaciones.push(asignacion);
        } else {
          recursosTemp.push({ id: asignacion.recurso.id, nombre: asignacion.recurso.nombre, asignaciones: [asignacion] });
        }
      });
      this.divs = [...recursosTemp];
      console.log(this.divs)
    })
  }

  enviarAsignacion(a:AsignacionRecursoTipoTurno){
    this.asignacionElegida.emit(a);
  }

  setEliminado(a:AsignacionRecursoTipoTurno){
    a.eliminado=!a.eliminado;
    this.asignacionService.editarAsignacion(a).subscribe(obj=>{
      if(obj.eliminado){
        this.toastr.success("Se borro la asignación "+obj.tipoTurno.nombre+" a "+obj.recurso.nombre+".","Genial!")
      }else{
        this.toastr.success("Se asigno "+obj.tipoTurno.nombre+" a "+obj.recurso.nombre+".","Genial!")
      }
    },(error)=>{
      this.toastr.error("Hubo un error al editar la asignacion, intente nuevamente.","Oops!")
      console.log(error);
    });
  }

  habilitarEdicion(n:number){
    this.modoAgregarTipoTurno=n;
  }
  cancelarEdicion(){
    this.modoAgregarTipoTurno=undefined;
  }

  setTipoTurno(){
    let auxError=0;
    if(this.asignacionSeleccionado){
      this.asignaciones.forEach(asig => {
        if(asig.id == this.asignacionSeleccionado){
          this.setEliminado(asig)
          this.asignacionSeleccionado=undefined;
          this.modoAgregarTipoTurno=undefined;
          auxError=1;
        }
      })
      if(auxError==0){
        this.toastr.error("Hubo un error al editar la asignacion, intente nuevamente.","Oops!")
      }
    }else{
      this.toastr.warning("Seleccione un Tipo de Turno.","Atención!")
    }
  }
}
