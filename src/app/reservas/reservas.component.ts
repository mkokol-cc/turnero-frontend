import { Component, OnInit } from '@angular/core';
import { Reserva } from '../modelo/reserva';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  reservas:Reserva[];

  constructor(private reservaServicio:ReservaService) { }

  ngOnInit(): void {
    this.obtenerReservas();
  }

  private obtenerReservas(){
    this.reservaServicio.obtenerListaReservas().subscribe(dato=>{
      this.reservas=dato;
    })
  }

}
