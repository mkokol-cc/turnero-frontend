import { Component, Input, OnInit } from '@angular/core';
import { Estado } from 'src/app/modelo/estado';
import { Reserva } from 'src/app/modelo/reserva';
import { ReservaService } from 'src/app/services/reserva.service';


@Component({
  selector: 'app-nuevas-reservas',
  templateUrl: './nuevas-reservas.component.html',
  styleUrls: ['./nuevas-reservas.component.css']
})
export class NuevasReservasComponent implements OnInit {
  @Input() reservas:Reserva[];
  listaEstados:Estado[]=[];
  reservaEdit:number;
  p:number=1;

  reservasRespaldo:Reserva[];

  filter:string='';

  dia1:string;
  dia2:string;

  constructor(private reservaService:ReservaService) {}


  ngOnInit(): void {
    this.obtenerTodosLosEstados();
    //alert(this.reserva.length) el problema es que esta en 0 cuando se inicializa el ngx-pag por eso no anda
  }

  obtenerTodosLosEstados(){
    this.reservaService.getEstados().subscribe(obj=>{
      this.listaEstados=obj;
      console.log(this.listaEstados)
    });
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








  //COSAS DE FILTROS

  borrarFiltroDias(){
    this.dia1=undefined;
    this.dia2=undefined;
    this.filtrar();
  }

  handleInputChange(event) {
    this.filter = event.target.value;
    this.filtrar();
  }


  filtrar(){
    //otro array aux de reservas
    if(this.reservas && !this.reservasRespaldo && (this.reservas!=this.reservasRespaldo)){
      this.reservasRespaldo=this.reservas;
    }
    //si el filter es '' entonces el aux = reservas
    //si el filter tiene valor entonces aux = filtracion por telefono, recurso
    if(this.reservas){
      if(this.filter.trim()!=''){
        this.filtrarPorBusqueda();
      }else if(this.reservasRespaldo && (this.reservas!=this.reservasRespaldo)){
        this.reservas=this.reservasRespaldo;
      } 
      
      if(this.dia1){
        if(this.dia2){
          this.filtrarPorRangoDias();
        }else{
          //comparar si el dia 1 es igual a el dia de la reserva
          this.filtrarPorDia();
        }
      }
    }
  }
  //----no llamar a estas funciones fuera de la funcion filtrar()----
  filtrarPorBusqueda(){
    this.reservas=this.reservasRespaldo.filter(res => 
      res.asignacion.tipoTurno.nombre.includes(this.filter) ||
      res.asignacion.recurso.nombre.includes(this.filter) ||
      (res.reservante.telefono != null && res.reservante.telefono.includes(this.filter))
    );
  }
  filtrarPorDia(){
    let reservasQueCoinciden = [];
    this.reservas.forEach(res => {
      let diaToString = res.fecha.toString().split('-').reverse().join('-')
      if(this.esteDiaEsMayorAEste(new Date(diaToString),new Date(this.dia1))==null){
        reservasQueCoinciden.push(res)
      }
    });
    this.reservas = reservasQueCoinciden;
  }
  filtrarPorRangoDias(){
    let reservasQueCoinciden = [];
    this.reservas.forEach(res => {
      let diaToString = res.fecha.toString().split('-').reverse().join('-')
      if(this.esteDiaEsMayorAEste(new Date(diaToString),new Date(this.dia1))
      && this.esteDiaEsMayorAEste(new Date(this.dia2),new Date(diaToString))){
        reservasQueCoinciden.push(res)
      }
    });
    this.reservas = reservasQueCoinciden;
  }
  //----------------------------------------------------------------
    

  //devuelve true si el dia 1 es mayor que el 2
  //devuelve false si el dia 2 es mayor que el 1
  //devuelve null si son iguales
  esteDiaEsMayorAEste(dia1:Date,dia2:Date):boolean{
    if(dia1 > dia2){
      return true;
    }else if(dia1 < dia2){
      return false;
    }else{
      return null;
    }
  }




}
