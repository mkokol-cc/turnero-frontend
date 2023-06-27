import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';
import { ConfirmationService } from 'src/app/services/confirmation.service';



@Component({
  selector: 'app-datos-tipoturno',
  templateUrl: './datos-tipoturno.component.html',
  styleUrls: ['./datos-tipoturno.component.css']
})
export class DatosTipoturnoComponent implements OnChanges {
  @Input() tipoTurno:TipoTurno;
  asigDeTipoTurno:AsignacionRecursoTipoTurno[]=[];
  asignacion:AsignacionRecursoTipoTurno=new AsignacionRecursoTipoTurno();

  constructor(private asignacionService:AsignacionRecursoTipoTurnoService, 
    private confirmationService:ConfirmationService,private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges){
    if (changes.tipoTurno && changes.tipoTurno.currentValue) {
      this.asignacionService.obtenerAsignaciones().subscribe(obj=>{
        this.asigDeTipoTurno = obj.filter(a => a.tipoTurno.id == this.tipoTurno.id);
      })
    }
  }

  async guardarDatosTipoTurno(){
    const confirmed = await this.confirmationService.confirm('¿Está seguro de que desea eliminar este elemento?');
    if (confirmed) {
      try {
        this.asigDeTipoTurno.forEach(a => {
          a.cantidadConcurrencia=this.asignacion.cantidadConcurrencia;
          a.duracionEnMinutos=this.asignacion.duracionEnMinutos;
          a.precioDesde=this.asignacion.precioDesde;
          a.precioHasta=this.asignacion.precioHasta;
          a.senia=this.asignacion.senia;
          console.log(a);
          this.asignacionService.editarAsignacion(a).subscribe(obj=>{
            //alert("se cambio la asignacion "+obj.id);
          })
        });
        this.toastr.success('Se actualizaron todas las Asignaciones del Tipo de Turno', 'Genial!');
      } catch (error) {
        this.toastr.error('Ocurrió un error al actualizar los datos a las Asignaciones del Tipo de Turno','Oops!');
      }
    }
  }

}
