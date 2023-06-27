import { Component, OnInit } from '@angular/core';
import { IOpcionVariable } from 'src/app/interfaces/iopcion-variable';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { Horario } from 'src/app/modelo/horario';
import { Recurso } from 'src/app/modelo/recurso';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';
import { HorarioService } from 'src/app/services/horario.service';
import { Dia } from 'src/app/modelo/dia';
import { HorarioEspecial } from 'src/app/modelo/horario-especial';
import moment from 'moment-timezone';

@Component({
  selector: 'app-horario-asignacion',
  templateUrl: './horario-asignacion.component.html',
  styleUrls: ['./horario-asignacion.component.css']
})
export class HorarioAsignacionComponent implements OnInit {

  radio:any[]=[];
  seleccion:IOpcionVariable;
  todasLasAsig:AsignacionRecursoTipoTurno[]=[];
  horarios:Horario[]=[];
  horariosEspeciales:HorarioEspecial[]=[];
  selectedRadio:string;
  nombreAsignacionSeleccionada:string;
  paso:number=1;
  
  habilitarDiaEsp:boolean=false;
  diaEspecifico:Date;

  nuevoDesde:string;
  nuevoHasta:string;
  nuevoDia:Dia;

  asigSeleccionada:AsignacionRecursoTipoTurno;

  constructor(private recursoService:RecursoService, private tipoTurnoService:TipoTurnoService,
    private asignacionService:AsignacionRecursoTipoTurnoService, private horarioService:HorarioService) {}

  ngOnInit(): void {
    this.getAsignaciones();
  }

  onButtonClick(seleccionDelHijo: IOpcionVariable) {
    if(seleccionDelHijo.tipoTurno){
      this.seleccion=seleccionDelHijo;
      this.getRecurso(seleccionDelHijo.tipoTurno)
    }else if(seleccionDelHijo.recurso){
      this.seleccion=seleccionDelHijo;
      this.getTipoTurno(seleccionDelHijo.recurso)
    }else{
      alert("HUBO UN PROBLEMA AL CARGAR LOS DATOS")
    }
  }

  getAsignaciones(){
    this.asignacionService.obtenerAsignaciones().subscribe(obj=>{
      this.todasLasAsig=obj;
      console.log(this.todasLasAsig);
    })
  }

  verHorarios(){
    if(this.habilitarDiaEsp && this.diaEspecifico){
      this.horarios=[];
      this.horarioService.obtenerHorarioDeAsignacionDiaEspecifico(parseInt(this.selectedRadio),this.formatearFecha(this.diaEspecifico)).subscribe(obj=>{
        this.horariosEspeciales=obj;
        console.log(this.horariosEspeciales)
      })
      this.paso=2;
    }else{
      this.horariosEspeciales=[];
      this.horarioService.obtenerHorarioDeAsignacion(parseInt(this.selectedRadio)).subscribe(obj=>{
        this.horarios=obj;
      })
      this.paso=2;
    }
    let a = this.todasLasAsig.find(asig => asig.id == parseInt(this.selectedRadio));
    console.log(a);
    this.asigSeleccionada=a;
    this.nombreAsignacionSeleccionada = a.tipoTurno.nombre + " de " + a.recurso.nombre;
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

  getRecurso(tipoTurno:TipoTurno){
    this.recursoService.obtenerRecursosPorTipoTurno(tipoTurno.id).subscribe(obj=> {
      this.radio = obj;
    })
  }

  getTipoTurno(recurso: Recurso) {
    this.tipoTurnoService.obtenerTipoTurnoPorRecurso(recurso.id).subscribe(obj=>{
      this.radio = obj;
    });
  }

  guardarHorarios(){
    if(this.habilitarDiaEsp){
      this.guradarHorariosEspeciales();
    }else{
      this.guardarHorariosComunes();
    }
  }

  guardarHorariosComunes(){
    let horariosNumeros = this.horarios.map((horario) => {
      let diaNumero = Object.keys(Dia).indexOf(horario.dia);
      return { ...horario, dia: diaNumero };
    });
    this.horarioService.setHorariosAsignacion(parseInt(this.selectedRadio),horariosNumeros).subscribe(obj=>{
      alert("Se enviaron los datos de los horarios");
    })
    //console.log(horariosNumeros);
  }

  guradarHorariosEspeciales(){
    this.horarioService.obtenerHorarioDeAsignacionDiaEspecifico(parseInt(this.selectedRadio),this.formatearFecha(this.diaEspecifico)).subscribe(obj=>{
      if(this.horariosEspeciales!=obj){
        //enviar datos
        this.horarioService.setHorariosEspeciales(parseInt(this.selectedRadio),this.horariosEspeciales).subscribe(obj=>{
          alert("datos enviados");
        })
      }
    })
  }

  guardarCerrado(){
    //obtener la asignacion
    //crear el objeto con desde y hasta = null

    // Crea una nueva fecha
    let fecha = new Date(this.diaEspecifico);

    // Convierte la fecha a la zona horaria deseada
    let fechaConvertida = moment.tz(fecha, 'America/Buenos_Aires');
    alert("voy a enviar este dia "+this.diaEspecifico)
    let f = [{
      "desde":null,
      "hasta":null,
      "feriado":true,
      //"fecha":this.diaEspecifico
      "fecha": fechaConvertida.toISOString()
    }];
    console.log("voy a enviar esto:")
    console.log(f)
    this.horarioService.setHorariosEspeciales(parseInt(this.selectedRadio),f).subscribe(obj=>{
      alert("datos enviados");
    })
  }

  borrarHorario(h:Horario){
    const indexHorarioABorrar = this.horarios.findIndex((horario) => horario.dia === h.dia && horario.desde === h.desde && horario.hasta === h.hasta);
    // Si se encuentra el objeto Horario, se elimina del array
    if (indexHorarioABorrar !== -1) {
      this.horarios.splice(indexHorarioABorrar, 1);
    }
  }

  borrarHorarioEspecial(he:HorarioEspecial){
    const indexHorarioABorrar = this.horariosEspeciales.findIndex((horario) => horario.desde === he.desde && horario.hasta === he.hasta);
    // Si se encuentra el objeto Horario, se elimina del array
    if (indexHorarioABorrar !== -1) {
      this.horariosEspeciales.splice(indexHorarioABorrar, 1);
    }
  }

  agregarHorario(){
    if(this.habilitarDiaEsp){
      let h = new HorarioEspecial();
      h.desde=this.nuevoDesde+":00";
      h.hasta=this.nuevoHasta+":00";
      if (this.horariosEspeciales.length==1 && this.horariosEspeciales[0].desde==null && this.horariosEspeciales[0].hasta==null) {
        this.horariosEspeciales=[];
      }
      this.horariosEspeciales.push(h);
      console.log(this.horariosEspeciales)
    }else{
      let h = new Horario();
      h.desde=this.nuevoDesde+":00";
      h.hasta=this.nuevoHasta+":00";
      h.dia=this.nuevoDia;
      this.horarios.push(h);
      console.log(this.horarios);
    }
    //alert(this.nuevo);
  }

  irAlPaso(numero:number){
    this.paso=numero;
  }

}
