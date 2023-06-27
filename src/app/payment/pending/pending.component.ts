import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/modelo/reserva';
import { ReservaService } from 'src/app/services/reserva.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  reserva: Reserva;
  reservaGuardada:any;

  constructor(private checkoutService: CheckoutService,private reservaServicio:ReservaService) {
    this.checkoutService.objeto$.subscribe(objeto => this.reserva = objeto);
  }

  ngOnInit(): void {
    this.guardarReserva()
  }

  guardarReserva(){
    this.reservaServicio.registrarReserva(this.reserva).subscribe(dato=>{
      this.reservaGuardada=dato;
    })
  }

}
