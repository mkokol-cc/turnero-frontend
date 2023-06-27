import { Time } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Dia } from 'src/app/modelo/dia';
import { Horario } from 'src/app/modelo/horario';

@Component({
  selector: 'app-registrar-horarios',
  templateUrl: './registrar-horarios.component.html',
  styleUrls: ['./registrar-horarios.component.css']
})
export class RegistrarHorariosComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter<Horario[]>(); 

  listaHorarios:Horario[]=[];
  diasSemana = [];
  desde:string;
  hasta:string;
  constructor() { }

  ngOnInit(): void {
    this.obtenerDias()
  }

  ngSubmit(){
    this.agregarHorario()
    this.enviarHorarios()
  }

  agregarHorario(){
    this.diasSemana.forEach(dia => {
      if(dia.valor){
        let horario:Horario = new Horario();
        horario.desde=this.desde+":00"
        horario.hasta=this.hasta+":00"
        horario.dia=dia.nombre;
        console.log(horario)
        this.listaHorarios.push(horario);
      }
      //console.log(`El valor de ${dia.nombre} es ${dia.valor}`);
    });
  }

  obtenerDias() {
    this.diasSemana = Object.values(Dia).map(dia => ({
      nombre: dia,
      valor: false
    }));
    console.log(this.diasSemana);
  }

  enviarHorarios(){
    this.buttonClicked.emit(this.listaHorarios);
  }








}
