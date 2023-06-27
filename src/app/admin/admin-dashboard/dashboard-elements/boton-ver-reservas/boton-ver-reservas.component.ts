import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Estado } from 'src/app/modelo/estado';
import { Reserva } from 'src/app/modelo/reserva';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-boton-ver-reservas',
  templateUrl: './boton-ver-reservas.component.html',
  styleUrls: ['./boton-ver-reservas.component.css']
})
export class BotonVerReservasComponent implements OnInit {
  @Input() reservas:Reserva[];
  reservasAPasar:Observable<Reserva[]>;




  reservasAMostrar:Reserva[];
  rangoDias:number=0;
  listaEstados:Estado[]=[];
  reservaEdit:number;
  p:number=1;






  constructor(private reservaService:ReservaService) { }

  ngOnInit(): void {
    this.reservasAPasar=of(this.reservas)
    console.log(this.reservasAPasar)

    this.reservasAMostrar=this.reservas;


    this.obtenerTodosLosEstados();
  }



































  obtenerTodosLosEstados(){
    this.reservaService.getEstados().subscribe(obj=>{
      this.listaEstados=obj;
      console.log(this.listaEstados)
    });
  }


  setRangoDias(n:number){
    this.rangoDias=n;
  }

  editarEstado(r:Reserva){
    this.reservaEdit=r.id;
  }

  cancelarEdicion(){
    this.reservaEdit=undefined;
  }

  guardarEstado(r:Reserva){
    const selectElement = document.getElementById(`estado-reserva-${r.id}-select`) as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.reservaService.setEstadoReserva(r.id, parseInt(selectedValue)).subscribe(
      obj => {
        console.log(obj);
        alert("Se cambió el estado");
      },
      error => {
        alert("Hubo un error: " + error);
      }
    );
  }

}
