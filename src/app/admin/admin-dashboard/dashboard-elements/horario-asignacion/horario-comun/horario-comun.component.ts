import { Component, Input, OnInit } from '@angular/core';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { Dia } from 'src/app/modelo/dia';
import { Horario } from 'src/app/modelo/horario';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';
import { HorarioService } from 'src/app/services/horario.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';

@Component({
  selector: 'app-horario-comun',
  templateUrl: './horario-comun.component.html',
  styleUrls: ['./horario-comun.component.css']
})
export class HorarioComunComponent implements OnInit {

  //input asignacion
  @Input() asignacion:AsignacionRecursoTipoTurno;

  
  radio:any[]=[];
  //seleccion:IOpcionVariable;
  //todasLasAsig:AsignacionRecursoTipoTurno[]=[];
  horarios:Horario[]=[];
  //horariosEspeciales:HorarioEspecial[]=[];
  selectedRadio:string;
  nombreAsignacionSeleccionada:string;
  paso:number=1;
  
  habilitarDiaEsp:boolean=false;
  diaEspecifico:Date;

  nuevoDesde:string;
  nuevoHasta:string;
  nuevoDia:Dia;

  constructor(private recursoService:RecursoService, private tipoTurnoService:TipoTurnoService,
    private asignacionService:AsignacionRecursoTipoTurnoService, private horarioService:HorarioService) 
  { }

  ngOnInit(): void {
    this.verHorarios()
  }

  verHorarios(){
    //this.horarios=[];
    this.horarioService.obtenerHorarioDeAsignacion(this.asignacion.id).subscribe(obj=>{
      this.horarios=obj;
    })
  }

  guardarHorarios(){
    let horariosNumeros = this.horarios.map((horario) => {
      let diaNumero = Object.keys(Dia).indexOf(horario.dia);
      return { ...horario, dia: diaNumero };
    });
    this.horarioService.setHorariosAsignacion(this.asignacion.id,horariosNumeros).subscribe(obj=>{
      alert("Se enviaron los datos de los horarios");
    })
    //console.log(horariosNumeros);
  }

  borrarHorario(h:Horario){
    const indexHorarioABorrar = this.horarios.findIndex((horario) => horario.dia === h.dia && horario.desde === h.desde && horario.hasta === h.hasta);
    // Si se encuentra el objeto Horario, se elimina del array
    if (indexHorarioABorrar !== -1) {
      this.horarios.splice(indexHorarioABorrar, 1);
    }
  }

  agregarHorario(){
    let h = new Horario();
    h.desde=this.nuevoDesde+":00";
    h.hasta=this.nuevoHasta+":00";
    h.dia=this.nuevoDia;
    this.horarios.push(h);
    console.log(this.horarios);
  }



  verDatos(){
    alert("consola")
    console.log("--------------------------")
    console.log(this.asignacion)
  }
  

}
