import { Component, Input, OnInit } from '@angular/core';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { Horario } from 'src/app/modelo/horario';
import { HorarioEspecial } from 'src/app/modelo/horario-especial';
import { Dia } from 'src/app/modelo/dia';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-horarios-asignacion',
  templateUrl: './horarios-asignacion.component.html',
  styleUrls: ['./horarios-asignacion.component.css']
})
export class HorariosAsignacionComponent implements OnInit {
  @Input() asignacion: AsignacionRecursoTipoTurno;
  horarios:Horario[]=[];
  horariosEspeciales:HorarioEspecial[]=[];
  fecha:string;
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

  constructor(private horarioService:HorarioService) { }

  ngOnInit(): void {
    this.obtenerHorarios();
    console.log(this.asignacion)
  }

  obtenerHorarios(){
    this.horarioService.obtenerHorarioDeAsignacion(this.asignacion.id).subscribe(obj=>{
      this.horarios=obj;
    })
  }

  obtenerHorariosEspeciales(){
    this.horarioService.obtenerHorarioDeAsignacionDiaEspecifico(this.asignacion.id,this.fechaFormateada()).subscribe(obj=>{
      this.horariosEspeciales=obj;
    })
  }

  addHorario(){
    if(this.comprobarHorario(this.desde,this.hasta)){
      let h = new Horario();
      h.desde = this.desde+":00";
      h.hasta = this.hasta+":00";
      h.dia = this.lista[this.indiceDia];
      this.horarios.push(h)
      this.indiceDia=null;
      this.guradarHorarios();
    }else{
      alert("HORARIOS MAL")
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
      this.guradarHorariosEspeciales();
    }else{
      alert("HORARIOS MAL")
    }
  }

  eliminarHorarioEsp(h: HorarioEspecial): Promise<void> {
    return new Promise<void>((resolve) => {
      this.horariosEspeciales = this.horariosEspeciales.filter(obj => obj != h)
      this.guradarHorariosEspeciales();
      resolve();
    });
  }

  eliminarHorario(h: Horario): Promise<void> {
    return new Promise<void>((resolve) => {
      this.horarios = this.horarios.filter(obj => obj != h);
      this.guradarHorarios();
      resolve();
    });
  }


  guradarHorariosEspeciales(){
    this.horarioService.setHorariosEspeciales(this.asignacion.id,this.horariosEspeciales).subscribe(obj=>{
      this.obtenerHorariosEspeciales();
    })
  }


  guradarHorarios(){
    this.horarioService.setHorariosAsignacion(this.asignacion.id,this.horarios).subscribe(obj=>{
      this.obtenerHorarios();
    })
  }

  fechaFormateada():string{
    let dia = this.fecha.substring(8, 10);
    let mes = this.fecha.substring(5, 7);
    let anio = this.fecha.substring(0, 4);
    return `${dia}-${mes}-${anio}`;
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

}
