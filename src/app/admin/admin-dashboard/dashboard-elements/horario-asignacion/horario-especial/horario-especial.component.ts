import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { HorarioEspecial } from 'src/app/modelo/horario-especial';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';
import { HorarioService } from 'src/app/services/horario.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';

@Component({
  selector: 'app-horario-especial',
  templateUrl: './horario-especial.component.html',
  styleUrls: ['./horario-especial.component.css']
})
export class HorarioEspecialComponent implements OnInit {

  //input asignacion
  @Input() asignacion:AsignacionRecursoTipoTurno;
  @Input() fecha:Date;
  
  radio:any[]=[];
  //seleccion:IOpcionVariable;
  //todasLasAsig:AsignacionRecursoTipoTurno[]=[];
  //horarios:Horario[]=[];
  horariosEspeciales:HorarioEspecial[]=[];
  selectedRadio:string;
  nombreAsignacionSeleccionada:string;
  paso:number=1;
  
  habilitarDiaEsp:boolean=false;
  diaEspecifico:Date;

  nuevoDesde:string;
  nuevoHasta:string;
  //nuevoDia:Dia;

  constructor(private recursoService:RecursoService, private tipoTurnoService:TipoTurnoService,
    private asignacionService:AsignacionRecursoTipoTurnoService, private horarioService:HorarioService) 
  { }

  ngOnInit(): void {
    this.verHorarios()
  }

  verHorarios(){
    //this.horarios=[];
    this.horarioService.obtenerHorarioDeAsignacionDiaEspecifico(this.asignacion.id,this.formatearFecha(this.fecha)).subscribe(obj=>{
      this.horariosEspeciales=obj;
      console.log(this.horariosEspeciales)
      console.log(this.horariosEspeciales.length)
    })
  }

  formatearFecha(fecha:Date):string{
    let fechaInput = new Date(fecha); // fechaInputValue es el valor del input date
    let tzOffset = fechaInput.getTimezoneOffset();
    fechaInput.setMinutes(fechaInput.getMinutes() + tzOffset);
    let dia = fechaInput.getDate().toString().padStart(2, '0');
    let mes = (fechaInput.getMonth() + 1).toString().padStart(2, '0');
    let anio = fechaInput.getFullYear().toString();
    let fechaFormateada = `${dia}-${mes}-${anio}`;//hay que pasarlo en formato dd-MM-yyyy
    return fechaFormateada;
  }

  guardarHorarios(){
    this.horarioService.obtenerHorarioDeAsignacionDiaEspecifico(this.asignacion.id,this.formatearFecha(this.diaEspecifico)).subscribe(obj=>{
      if(this.horariosEspeciales!=obj){
        //enviar datos
        this.horarioService.setHorariosEspeciales(this.asignacion.id,this.horariosEspeciales).subscribe(obj=>{
          alert("datos enviados");
        })
      }
    })
  }

  borrarHorario(h:HorarioEspecial){
    const indexHorarioABorrar = this.horariosEspeciales.findIndex((horario) => horario.desde === h.desde && horario.hasta === h.hasta);
    // Si se encuentra el objeto Horario, se elimina del array
    if (indexHorarioABorrar !== -1) {
      this.horariosEspeciales.splice(indexHorarioABorrar, 1);
    }
  }

  agregarHorario(){
    let h = new HorarioEspecial();
    h.desde=this.nuevoDesde+":00";
    h.hasta=this.nuevoHasta+":00";
    if (this.horariosEspeciales.length==1 && this.horariosEspeciales[0].desde==null && this.horariosEspeciales[0].hasta==null) {
      this.horariosEspeciales=[];
    }
    this.horariosEspeciales.push(h);
    console.log(this.horariosEspeciales)
  }

  
  guardarCerrado(){
    let fecha = new Date(this.diaEspecifico);
    let fechaConvertida = moment.tz(fecha, 'America/Buenos_Aires');

    let f = [{
      "desde":null,
      "hasta":null,
      "feriado":true,
      "fecha": fechaConvertida.toISOString()
    }];

    this.horarioService.setHorariosEspeciales(this.asignacion.id,f).subscribe(obj=>{
      alert("datos enviados");
    })
  }

  verDatos(){
    alert("consola")
    console.log("--------------------------")
    console.log(this.asignacion)
    console.log(this.fecha)
  }
}
