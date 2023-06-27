import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { Dia } from 'src/app/modelo/dia';
import { Horario } from 'src/app/modelo/horario';
import { HorarioEspecial } from 'src/app/modelo/horario-especial';
import { Recurso } from 'src/app/modelo/recurso';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ToastrService } from 'ngx-toastr';


import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-horarios-recurso',
  templateUrl: './horarios-recurso.component.html',
  styleUrls: ['./horarios-recurso.component.css'],
  providers: [CardModule]
})
export class HorariosRecursoComponent implements OnChanges {

  @Input() recurso:Recurso;

  horarios:Horario[]=[];
  horariosEspeciales:HorarioEspecial[]=[];
  fecha:string=null;
  desde:string;
  hasta:string;
  desdeEsp:string;
  hastaEsp:string;
  habilitarFormHora:boolean=false;
  habilitarHorarioEsp:boolean=false;
  lista = [
    Dia.LUNES,
    Dia.MARTES,
    Dia.MIÉRCOLES,
    Dia.JUEVES,
    Dia.VIERNES,
    Dia.SÁBADO,
    Dia.DOMINGO
  ]
  indiceDia:number=null;

  asigDeRecursos:AsignacionRecursoTipoTurno[]=[];

  paso:number=1;





  selectedDias: {[key: number]: boolean} = {};

  constructor(private horarioService:HorarioService, 
    private asignacionService:AsignacionRecursoTipoTurnoService,
    private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.recurso && changes.recurso.currentValue) {
      this.asignacionService.obtenerAsignaciones().subscribe(obj=>{
        this.asigDeRecursos = obj.filter(a => a.recurso.id == this.recurso.id);
      })
    }
  }


  addHorario(){
    if(this.comprobarHorario(this.desde,this.hasta)){
      let h = new Horario();
      h.desde = this.desde+":00";
      h.hasta = this.hasta+":00";
      h.dia = this.lista[this.indiceDia];
      this.horarios.push(h)
      this.indiceDia=null;
    }else{
      this.toastr.error('Hay horarios erroneos','Oops!');
    }
  }

  addHorarioEsp(){
    if(this.comprobarHorarioEsp(this.desdeEsp,this.hastaEsp)){
      let h = new HorarioEspecial();
      h.desde = this.desdeEsp+":00";
      h.hasta = this.hastaEsp+":00";
      h.fecha = this.fechaFormateada();
      h.motivo="";
      h.feriado=false;
      this.horariosEspeciales.push(h);
    }else{
      this.toastr.error('Hay horarios erroneos','Oops!');
    }
  }

  eliminarHorarioEsp(h: HorarioEspecial): Promise<void> {
    return new Promise<void>((resolve) => {
      this.horariosEspeciales = this.horariosEspeciales.filter(obj => obj != h)
      resolve();
    });
  }

  eliminarHorario(h: Horario): Promise<void> {
    return new Promise<void>((resolve) => {
      this.horarios = this.horarios.filter(obj => obj != h);
      resolve();
    });
  }

  irPaso(x:number){
    if(x==2){
      if(this.fecha==null){
        this.toastr.error('Por favor, selecciona una fecha','Oops!');
      }else{
        this.horariosEspeciales=[];
        this.paso=2;
        //alert("paso = "+this.paso);
      }
    }
    if(x==1){
      if(this.horariosEspeciales.length>0){
        alert("NO GUARDASTE LOS HORARIOS SEGURO QUE QUIERES VOLVER?");
      }else{
        this.paso=1;
      }
    }
    //mostrar en pantalla el dia y dar la opcion de volver
  }

  fechaFormateada():string{
    let dia = this.fecha.substring(8, 10);
    let mes = this.fecha.substring(5, 7);
    let anio = this.fecha.substring(0, 4);
    return `${dia}-${mes}-${anio}`;
  }


  confirmarHorarios(){
    //ver si hay horarios (opcional)
    //avisar que se va a setear el horario a todas las asignaciones del recurso (aceptar-cancelar)
    let aux = false;
    this.asigDeRecursos.forEach(asignacion => {
      this.horarioService.setHorariosAsignacion(asignacion.id,this.horarios).subscribe(obj=>{
        //alert("okey")
        //console.log(obj)
      },(error)=>{
        aux=true;
        console.log(error)
      })
    });
    if(!aux){
      this.toastr.success('Se registraron los horarios del Recurso','Genial!');
    }else{
      this.toastr.error('Ocurrió un error al registrar los horarios del Recurso','Oops!');
    }
    //avisar que se hizo y dejar en pantalla esos horarios
  }

  confirmarHorariosEsp(){
    //ver si hay horarios especiales (opcional)
    //avisar que se va a setear el horario especial a todas las asignaciones del recurso (aceptar-cancelar)
    let aux = false;
    this.asigDeRecursos.forEach(asignacion => {
      this.horarioService.setHorariosEspeciales(asignacion.id,this.horariosEspeciales).subscribe(obj=>{
        //alert("okey")
        //console.log(obj)
      },(error)=>{
        aux=true;
        console.log(error)
      })
    });
    if(!aux){
      this.toastr.success('Se registraron los horarios del Recurso','Genial!');
    }else{
      this.toastr.error('Ocurrió un error al registrar los horarios del Recurso','Oops!');
    }
    //avisar que se hizo y dejar en pantalla esos horarios
  }















  comprobarHorario(desde:string,hasta:string): boolean {
    const d = new Date(`1970-01-01T${desde}Z`);
    const h = new Date(`1970-01-01T${hasta}Z`);
  
    // Verificar si el nuevo horario no pisa con ningún otro horario existente
    const pisaHorarioExistente = this.horarios.some((horarioExistente) => {
      const desdeExistente = new Date(`1970-01-01T${horarioExistente.desde}Z`);
      const hastaExistente = new Date(`1970-01-01T${horarioExistente.hasta}Z`);
  
      return (
        (d >= desdeExistente && d < hastaExistente) ||
        (h > desdeExistente && h <= hastaExistente) ||
        (d <= desdeExistente && h >= hastaExistente)
      );

    });
  
    // Verificar si la fecha de "desde" es menor que la fecha de "hasta"
    const esHorarioValido = desde < hasta;
  
    // Agregar el nuevo horario si es válido y no pisa con ningún otro horario existente
    if (esHorarioValido && !pisaHorarioExistente) {
      return true;
    } else {
      return false;
    }
  }

  comprobarHorarioEsp(desde:string,hasta:string): boolean {
    const d = new Date(`1970-01-01T${desde}Z`);
    const h = new Date(`1970-01-01T${hasta}Z`);
  
    // Verificar si el nuevo horario no pisa con ningún otro horario existente
    const pisaHorarioExistente = this.horariosEspeciales.some((horarioExistente) => {
      const desdeExistente = new Date(`1970-01-01T${horarioExistente.desde}Z`);
      const hastaExistente = new Date(`1970-01-01T${horarioExistente.hasta}Z`);
  
      return (
        (d >= desdeExistente && d < hastaExistente) ||
        (h > desdeExistente && h <= hastaExistente) ||
        (d <= desdeExistente && h >= hastaExistente)
      );
    });
  
    // Verificar si la fecha de "desde" es menor que la fecha de "hasta"
    const esHorarioValido = desde < hasta;
  
    // Agregar el nuevo horario si es válido y no pisa con ningún otro horario existente
    if (esHorarioValido && !pisaHorarioExistente) {
      return true;
    } else {
      return false;
    }
  }







  agregarHorario(){
    const keysWithTrueValues = Object.entries(this.selectedDias).filter(([key, value]) => value).map(([key, value]) => key);
    /*
    let mensaje="";
    keysWithTrueValues.forEach(e => {
      mensaje=mensaje+this.lista[e]
    });
    alert("dias "+mensaje);
    */
    console.log(this.horarios)
    if(keysWithTrueValues.length>0){
      if(this.comprobarHorario(this.desde,this.hasta)){
        keysWithTrueValues.forEach(e => {
          let h = new Horario();
          h.desde = this.desde+":00";
          h.hasta = this.hasta+":00";
          h.dia = this.lista[e];
          this.horarios.push(h);
        });
      }else{
        this.toastr.warning('Hay horarios erroneos','Atención!');
      }
    }else{
      this.toastr.error('Debes seleccionar al menos un día','Atención!');
    }

  }

}
