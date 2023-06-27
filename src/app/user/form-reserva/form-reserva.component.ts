import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/modelo/recurso';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { LoginService } from 'src/app/services/login.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';

@Component({
  selector: 'app-form-reserva',
  templateUrl: './form-reserva.component.html',
  styleUrls: ['./form-reserva.component.css']
})
export class FormReservaComponent implements OnInit {
  listaHorarios:String[]=[];
  listaTipoTurnos:TipoTurno[]=[];
  listaRecursos:Recurso[]=[]

  constructor(private loginService:LoginService, private reservaService:ReservaService
    ,private tipoTurnoService:TipoTurnoService, private recursoService:RecursoService) {} 


  ngOnInit(): void {
    this.getTiposDeTurno();
    this.getRecursos();
  }

  getTiposDeTurno():void{
    this.listaTipoTurnos=[];
    this.tipoTurnoService.obtenerTiposDeTurno().subscribe(dato=>{
      this.listaTipoTurnos=dato;
      console.log(this.listaTipoTurnos)
    });
  }

  getRecursos():void{
    this.listaRecursos=[];
    this.recursoService.obtenerRecursos().subscribe(dato=>{
      this.listaRecursos=dato;
      console.log(this.listaRecursos)
    });
  }

}
