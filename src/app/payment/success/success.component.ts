import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/modelo/reserva';
import { ReservaService } from 'src/app/services/reserva.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  reserva: Reserva;
  reservaGuardada:any;
  err:number;

  constructor(private checkoutService: CheckoutService,private reservaServicio:ReservaService) {
  }

  ngOnInit(): void {
    this.reserva = JSON.parse(localStorage.getItem('reserva'));
    this.guardarReserva()
  }

  guardarReserva(){
    this.reservaServicio.registrarReserva(this.reserva).subscribe(dato=>{
      this.reservaGuardada=dato;
      localStorage.removeItem('reserva');
      this.err=0;
    },(error)=>{
      this.err=1;
    })
  }

  volverAlSitio(){
    window.location.replace("http://127.0.0.1:4200");
  }

}
