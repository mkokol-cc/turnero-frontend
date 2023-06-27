import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/modelo/reserva';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { ComponentReloaderService } from 'src/app/services/component-reloader.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tabla-tipoturno',
  templateUrl: './tabla-tipoturno.component.html',
  styleUrls: ['./tabla-tipoturno.component.css']
})
export class TablaTipoturnoComponent implements OnInit {
  tiposDeTurno:TipoTurno[]=[];
  edicion:number=null;
  tipoTurnoParaDatos:TipoTurno;
  reservas:Reserva[]=[];
  todasLasReservas:Reserva[]=[];

  constructor(private tipoTurnoService:TipoTurnoService,
    private componentReloaderService: ComponentReloaderService,
     private reservaService:ReservaService,
     private toastr: ToastrService,
     private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show()
    this.componentReloaderService.onReloadComponent().subscribe(() => {
      this.reloadComponent();
    });
    this.obtenerTiposTurno();
    this.getReservas();
    this.spinnerService.hide();
  }

  reloadComponent() {
    this.obtenerTiposTurno();
  }

  obtenerTiposTurno(){
    this.tipoTurnoService.obtenerTiposDeTurno().subscribe(obj=>{
      this.tiposDeTurno=obj;
    },(error) => {
      console.error(error);
      this.toastr.error('Ocurrió un error al obtener los Tipos de Turno','Oops!');
    })
  }

  editar(id:number){
    this.edicion=id;
  }

  guardarDatosTipoTurno(id:number){

  }

  verDatos(t:TipoTurno){
    this.tipoTurnoParaDatos=t;
  }

  mostrarReservas(id:number){
    this.reservas=[];
    this.todasLasReservas.forEach(r => {
      if(r.asignacion.tipoTurno.id==id){
        this.reservas.push(r);
      }
    });
  }


  getReservas(){
    this.reservaService.obtenerListaReservas().subscribe(obj=>{
      this.todasLasReservas=obj;
    },(error) => {
      console.error(error);
      this.toastr.error('Ocurrió un error al obtener las Reservas','Oops!');
    })
  }




  onChange(event,id:number){
    this.tiposDeTurno.forEach(d => {
      if(d.id==id){
        d.eliminado=!event;
        this.tipoTurnoService.setHabilitado(d.id,!event).subscribe(obj=>{
          console.log(obj)
          this.toastr.success('Se actualizo el Tipo de Turno','Genial!');
        },(error) => {
          console.error(error);
          this.toastr.error('Ocurrió un error al actualizar el Tipo de Turno','Oops!');
        })
      }
    });
  }
}
