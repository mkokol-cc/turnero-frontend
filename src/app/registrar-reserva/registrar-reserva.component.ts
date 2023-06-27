import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from '../modelo/reserva';
import { ReservaService } from '../services/reserva.service';
import { TipoTurno } from '../modelo/tipo-turno';
import { TipoTurnoService } from '../services/tipo-turno.service';
import { AsignacionRecursoTipoTurno } from '../modelo/asignacion-recurso-tipo-turno';
import { AsignacionRecursoTipoTurnoService } from '../services/asignacion-recurso-tipo-turno.service';
import { HorarioService } from '../services/horario.service';
import { Reservante } from '../modelo/reservante';
import { CheckoutService } from '../payment/checkout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-reserva',
  templateUrl: './registrar-reserva.component.html',
  styleUrls: ['./registrar-reserva.component.css']
})
export class RegistrarReservaComponent implements OnInit {
  @Input() admin:number;
  @ViewChild('fecha') myDateInput: any;
  //disabledDates: string[] = ['2023-05-01', '2023-07-04', '2023-12-25', '2024-01-01'];
  disableInputs:boolean=false;
  
  minDate: string;

  reservante : Reservante = new Reservante();
  reserva : Reserva = new Reserva();
  //recursos:Recurso[];
  opcionReserva:number;
  tiposDeTurno:TipoTurno[];

  asignacionSeleccionada:AsignacionRecursoTipoTurno;

  tipoTurnoSeleccionado:TipoTurno;
  listaAsignaciones:AsignacionRecursoTipoTurno[]=[];
  listaAsignacionesSelect:AsignacionRecursoTipoTurno[]=[];

  horariosDisponibles:any[]=[];

  //-----------cosas de botones-----------
  btnPagarSenia:boolean=false;
  btnConfirmarReserva:boolean=false;

  constructor(private reservaServicio:ReservaService,private tipoTurnoServicio:TipoTurnoService, 
  private asginacionServicio:AsignacionRecursoTipoTurnoService,private horarioServicio:HorarioService,
  private router:Router, private checkoutService:CheckoutService,private toastr: ToastrService) { }

  

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.obtenerTiposDeTurno();
    this.obtenerAsignaciones();
  }

  incrementDate() {
    // Convierte la fecha seleccionada a un objeto Date y le suma un día
    const date = new Date(this.reserva.fecha);
    date.setDate(date.getDate() + 1);
    this.reserva.fecha = date;

  }

  decrementDate() {
    // Convierte la fecha seleccionada a un objeto Date y le resta un día
    const date = new Date(this.reserva.fecha);
    date.setDate(date.getDate() - 1);
    this.reserva.fecha = date;
  }

/*  actualizarDiasDisponibles() {
    this.disabledDates.forEach(date => {
      const option = document.createElement('option');
      option.value = date;
      option.disabled = true;
      this.myDateInput.nativeElement.appendChild(option);
    });
  }*/

  private obtenerAsignaciones(){
    this.asginacionServicio.obtenerAsignaciones().subscribe(dato=>{
      this.listaAsignaciones=dato;
    })
  }

  private obtenerTiposDeTurno(){
    this.tipoTurnoServicio.obtenerTiposDeTurno().subscribe(dato=>{
      this.tiposDeTurno=dato;
    })
  }

  registrar(){
    this.reservaServicio.registrarReserva(this.reserva).subscribe(dato=>{
      console.log(dato);
    })
  }

  onSelectChange(){//cosas que pasan cuando se cambia el valor del tipo de turno
    //setear fecha y asignacion a null
    this.asignacionSeleccionada=undefined;
    this.reserva.fecha=undefined;

    this.horariosDisponibles=[]
    this.listaAsignacionesSelect=[];
    this.listaAsignaciones.forEach(asig => {
      if(asig.tipoTurno.id==this.tipoTurnoSeleccionado.id && !asig.eliminado){
        this.listaAsignacionesSelect.push(asig);
      }
    });
  }

  buscarHorariosDisponibles(){
    let fechaFormateada = this.reserva.fecha.toString().split('-').reverse().join('-');
    this.horarioServicio.getHorariosDisponiblesAsig(this.asignacionSeleccionada.id,fechaFormateada).subscribe(obj=>{
      this.horariosDisponibles=obj;
      if(this.horariosDisponibles.length==0){
        this.toastr.info('No hay horarios disponibles para esa el dia '+fechaFormateada+'.','Lo Siento...');
      }     
      console.log(this.horariosDisponibles);
    })
  }

  guardarReserva(){
    /*
    alert(this.reserva.hora)
    this.reserva.reservante=this.reservante;
    this.reserva.asignacion=this.asignacionSeleccionada
    if(this.opcionReserva==1){
      this.reserva.tipoReserva="Individual"
    }else if(this.opcionReserva==2){
      this.reserva.tipoReserva="Fijo"
    }*/
    console.log(this.reserva);
    this.registrar();
  }

  enviar() {
    /*
    alert(this.reserva.hora)
    this.reserva.reservante=this.reservante;
    this.reserva.asignacion=this.asignacionSeleccionada
    if(this.opcionReserva==1){
      this.reserva.tipoReserva="Individual"
    }else if(this.opcionReserva==2){
      this.reserva.tipoReserva="Fijo"
    }*/
    console.log(this.reserva);
    this.checkoutService.enviarObjeto(this.reserva);
  }


  asignarHora(horaSeleccionada: string) {
    const hora = this.horariosDisponibles.find(h => h.hora === horaSeleccionada);
    if (hora) {
      this.reserva.hora = hora.hora;
    }
  }

  onDateChange(){
    if(this.reserva.fecha){
      this.horariosDisponibles=[]
      this.buscarHorariosDisponibles()
    }
  }

  habilitarBotones(){
    //console.log(this.asignacionSeleccionada);
    //console.log(this.reserva);
    if(this.asignacionSeleccionada && this.reserva){
      if(this.reserva.hora && this.reserva.fecha && this.reserva.tipoReserva && this.reservante.telefono){
        if(this.asignacionSeleccionada.senia && this.asignacionSeleccionada.senia>0){
          this.btnPagarSenia=true;
          this.btnConfirmarReserva=false;
        }else{
          this.btnPagarSenia=false;
          this.btnConfirmarReserva=true;
        }
        return null;
      }
    }
    this.btnPagarSenia=false;
    this.btnConfirmarReserva=false;
  }

  siguiente(){
    if(this.validarDatos()){
      if(this.opcionReserva == 1){
        this.reserva.tipoReserva="individual";
      }else if(this.opcionReserva == 2){
        this.reserva.tipoReserva="fijo";
      }
      if(this.asignacionSeleccionada){
        this.reserva.asignacion=this.asignacionSeleccionada;
      }
      if(this.reservante.telefono){
        this.reserva.reservante=this.reservante;
      }
      this.disableInputs=true;
      this.habilitarBotones();
      this.enviar();
    }
  }

  validarDatos():boolean{
    if(!this.asignacionSeleccionada){
      this.toastr.warning('Debes seleccionar un Recurso y un Tipo de Turno.','Atención!');
      return false;
    }
    if(!this.reservante.telefono){
      this.toastr.warning('Debes poner tu telefono.','Atención!');
      return false;
    }
    if(!this.reserva.fecha){
      this.toastr.warning('Debes seleccionar una fecha.','Atención!');
      return false;
    }
    if(!this.reserva.hora){
      this.toastr.warning('Debes seleccionar una hora.','Atención!');
      return false;
    }
    if(!this.opcionReserva){
      this.toastr.warning('Debes seleccionar el tipo de reserva.','Atención!');
      return false;
    }
    return true;
  }

  habilitarForm(){
    this.disableInputs=false;
    this.btnConfirmarReserva=false;
    this.btnPagarSenia=false;
  }

}
