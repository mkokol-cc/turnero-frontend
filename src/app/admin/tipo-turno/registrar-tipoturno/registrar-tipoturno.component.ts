import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/modelo/recurso';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { ComponentReloaderService } from 'src/app/services/component-reloader.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registrar-tipoturno',
  templateUrl: './registrar-tipoturno.component.html',
  styleUrls: ['./registrar-tipoturno.component.css']
})
export class RegistrarTipoturnoComponent implements OnInit {

  constructor(private service:TipoTurnoService, private componentReloaderService: ComponentReloaderService,
    private toastr: ToastrService) { }
  listaAsignaciones:AsignacionRecursoTipoTurno[]=[];
  seniaMontoEnCtvos:number;
  listaChbxRecursos=[];
  listaRecursos:Recurso[]=[];
  tipoTurno:TipoTurno = new TipoTurno();
  
  ngOnInit(): void {
  }

  ngSubmit(){
    this.tipoTurno.seniaMontoEnCtvos=this.seniaMontoEnCtvos;
    console.log(this.tipoTurno);
    this.service.guardarTipoTurno(this.tipoTurno).subscribe(dato=>{
      console.log(dato)
      this.toastr.success('Se registró el Tipo de Turno','Genial!');
      this.recargarTablaTipoTurno()
    },(error)=>{
      this.toastr.error('Ocurrió un error al registrar el Tipo de Turno','Oops!');
      console.log(error);
    }
    )
  }

  recargarTablaTipoTurno(){
    this.componentReloaderService.reloadComponent();
  }
}
