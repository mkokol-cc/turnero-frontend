import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recurso } from 'src/app/modelo/recurso';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { IOpcionVariable } from 'src/app/interfaces/iopcion-variable';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-mostrar-tipo-turno-recursos',
  templateUrl: './mostrar-tipo-turno-recursos.component.html',
  styleUrls: ['./mostrar-tipo-turno-recursos.component.css']
})
export class MostrarTipoTurnoRecursosComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter<IOpcionVariable>(); 

  uuid:string = uuidv4();
  seleccionTipoTurno:TipoTurno;
  seleccionRecurso:Recurso;
  verPor:number=1;
  out:IOpcionVariable;
  //listaRecursos:Recurso[]=[];
  //listaTipoTurno:TipoTurno[]=[];
  //tipoTurnoSeleccionado:number;
  //recursoSeleccionado:number;
  constructor() { }

  ngOnInit(): void {

  }

  tipoTurnoSeleccionado(option: TipoTurno) {
    console.log('Objeto seleccionado:', option);
    this.seleccionTipoTurno=option;
  }

  recursoSeleccionado(option: Recurso){
    console.log('Recurso seleccionado:', option);
    this.seleccionRecurso=option;
  }



  onSubmit(){
    this.enviarSeleccion();
  }

  enviarSeleccion(){
    if(this.verPor==1 && this.seleccionTipoTurno){
      this.out={
        tipoTurno:this.seleccionTipoTurno,
        recurso:null
      }
      this.buttonClicked.emit(this.out);
    }else if(this.verPor==2 && this.seleccionRecurso){
      this.out={
        tipoTurno:null,
        recurso:this.seleccionRecurso
      }
      this.buttonClicked.emit(this.out);
    }else{
      alert("Por Favor, Seleccione una opción.")
    }
  }

  cambiarVerPor(opcionSeleccionada: string) {
    this.verPor = opcionSeleccionada === 'Recurso' ? 2 : 1;
  }


}
