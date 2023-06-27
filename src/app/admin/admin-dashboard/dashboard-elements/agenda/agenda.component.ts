import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Reserva } from 'src/app/modelo/reserva';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  @ViewChild('agendaSubtitle', { static: true }) subtitulo: ElementRef;
  @ViewChild('agendaReservas', { static: true }) reservas: ElementRef;
  fechaInput: HTMLInputElement;
  restarDiaButton: HTMLButtonElement;
  sumarDiaButton: HTMLButtonElement;
  listaReservas:Reserva[];
  listaDia:any[]=[];
  listaDivs:any[]=[];
  estaVacio:boolean=false;

  constructor(private serviceReservas:ReservaService) { }



  ngOnInit(): void {
    this.setFechaActual()
    this.getReservas()
    this.fechaInput = document.getElementById("fecha-agenda") as HTMLInputElement;
    this.restarDiaButton = document.getElementById("restar-dia") as HTMLButtonElement;
    this.sumarDiaButton = document.getElementById("sumar-dia") as HTMLButtonElement;

    this.restarDiaButton.addEventListener("click", () => {
      const fecha = new Date(this.fechaInput.value);
      fecha.setDate(fecha.getDate() - 1);
      this.fechaInput.value = fecha.toISOString().substr(0, 10);
    });

    this.sumarDiaButton.addEventListener("click", () => {
      const fecha = new Date(this.fechaInput.value);
      fecha.setDate(fecha.getDate() + 1);
      this.fechaInput.value = fecha.toISOString().substr(0, 10);
    });
  }

  setFechaActual(): void{
    const fechaInput = document.getElementById("fecha-agenda") as HTMLInputElement;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const todayFormatted = yyyy + '-' + mm + '-' + dd;
    fechaInput.value = todayFormatted;
  }

  mostrarAgenda(): void{/*
    this.estaVacio=false;
    this.listaDivs=[]
    this.setearSubtitulo()
    if (this.getReservasPorDia(this.fechaInput.value)) {
      this.listaDia.forEach((obj: Reserva) => {
        this.listaDivs.push(this.generarDiv(obj));
      })
      console.log(this.listaDivs)
    }else{
      this.estaVacio=true;
    }*/
  }

  setearSubtitulo():void{
    this.subtitulo.nativeElement.innerHTML = 'Tu agenda para el dia <strong>'+this.fechaInput.value+'</strong>';
  }

  getReservas():void{
    this.serviceReservas.obtenerListaReservas().subscribe(dato=>{
      this.listaReservas=dato;
      //console.log(this.listaReservas);
    });
  }

  getReservasPorDia(fecha:string)/*:boolean*/{/*
    this.listaDia=[];
    this.listaReservas.forEach((obj: Reserva) => {
      console.log("voy a comparar "+obj.fecha+" y "+fecha)
      if(obj.fecha==fecha){
        this.listaDia.push(obj);
      }
    })
    if(this.listaDia.length==0){
      return false;
    }
    return true;*/
  }

  generarDiv(reserva:Reserva){
    return {id:reserva.id,
      //tipoTurno:reserva.tipoTurno.nombre,
      hora:reserva.hora,
      estado:reserva.estado.nombre,}
      //recurso:reserva.recurso.nombre,
      //usuario:reserva.usuario.apellido+" "+reserva.usuario.nombre};  
  }
}
