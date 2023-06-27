import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/modelo/reserva';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservas:Observable<Reserva[]>;

  constructor(private reservaService:ReservaService) { }

  ngOnInit(): void {
    this.obtenerReservas();
  }

  obtenerReservas(){
    this.reservas = this.reservaService.obtenerListaReservas();
    /*
    this.reservaService.obtenerListaReservas().subscribe(obj=>{
      this.reservas=obj;
      console.log(this.reservas)
    })*/
  }

}
