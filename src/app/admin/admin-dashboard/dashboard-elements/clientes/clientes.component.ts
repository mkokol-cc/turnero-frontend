import { Component, Input, OnChanges,SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Reserva } from 'src/app/modelo/reserva';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnChanges {
  @Input() reservas:Reserva[];
  divs:any[]=[];
  divsRespaldo:any[];
  reservasAMostrar:Observable<Reserva[]>;
  filter:string='';
  p:number=1;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reservas && changes.reservas.currentValue) {
      this.ordenarReservasPorClientes();
    }
  }

  ordenarReservasPorClientes(){
    /*
    const telefonos = this.reservas.reduce((acc, reserva) => {
      if (acc[reserva.reservante.id]) {
        acc[reserva.reservante.id]++;
      } else {
        acc[reserva.reservante.id] = 1;
      }
      return acc;
    }, {});
    this.divs = Object.entries(telefonos).map(([telefono, cantidad]) => ({ telefono, cantidad }));
    console.log(this.divs)*/

    const reservantes = this.reservas.reduce((acc, reserva) => {
      if (acc.has(reserva.reservante)) {
        acc.set(reserva.reservante, acc.get(reserva.reservante) + 1);
      } else {
        acc.set(reserva.reservante, 1);
      }
      return acc;
    }, new Map());
    this.divs = Array.from(reservantes.entries()).map(([reservante, cantidad]) => ({ reservante, cantidad }));
    console.log(this.divs);
    
    
  }

  mostrarReservas(idCliente:number){
    this.reservasAMostrar= of(this.reservas.filter(res => res.reservante.id == idCliente));

    /*
    this.reservasAMostrar.subscribe(reservas => { 
      // aqui tienes acceso al array de reservas y puedes asignar el valor que desees
      reservas = this.reservas.filter(res => res.reservante.id == idCliente);
    });
    
    //this.reservasAux=this.reservas.filter(res => res.reservante.id == idCliente);
    this.reservasAMostrar.next()
    this.reservas.forEach(reserva => {
      if(idCliente==reserva.reservante.id){
        //this.reservasAMostrar.push(reserva);
        this.reservasAux.push(reserva);
      }
    });
    this.reservasAMostrar.subscribe((asd)=>{}) = from(this.reservas)//.filter(res => res.reservante.id == idCliente);
    alert("termine, fijate la consola")
    console.log(this.reservasAMostrar)*/
  }

  handleInputChange(event) {
    this.filter = event.target.value;
    this.filtrar();
  }
  filtrar(){
    if(this.divs && !this.divsRespaldo && (this.divs!=this.divsRespaldo)){
      this.divsRespaldo=this.divs;
    }
    //si el filter es '' entonces el aux = reservas
    //si el filter tiene valor entonces aux = filtracion por telefono, recurso
    if(this.divs){
      if(this.filter.trim()!=''){
        this.divs=this.divsRespaldo.filter(d => 
          (d.reservante.telefono != null && d.reservante.telefono.includes(this.filter))
        );
      }else if(this.divsRespaldo && (this.divs!=this.divsRespaldo)){
        this.divs=this.divsRespaldo;
      } 
    }
  }

}
