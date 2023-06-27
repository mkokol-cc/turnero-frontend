import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';

@Component({
  selector: 'app-datos-asignacion',
  templateUrl: './datos-asignacion.component.html',
  styleUrls: ['./datos-asignacion.component.css']
})
export class DatosAsignacionComponent implements OnInit {
  @Input() asignacion: AsignacionRecursoTipoTurno;
  constructor(private asignacionService:AsignacionRecursoTipoTurnoService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  guardarDatosAsignacion(){
    console.log(this.asignacion)
    this.asignacionService.editarAsignacion(this.asignacion).subscribe(obj=>{
      console.log(obj)
      this.toastr.success("Se guardaron los datos de la asignación correctamente.","Genial!")
    },(error)=>{
      this.toastr.error("Hubo un error al editar la asignacion, intente nuevamente.","Oops!")
      console.log(error);
    });
  }

}
