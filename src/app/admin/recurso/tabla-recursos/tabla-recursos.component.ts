import { Component, ElementRef, OnInit } from '@angular/core';
import { Recurso } from 'src/app/modelo/recurso';
import { Reserva } from 'src/app/modelo/reserva';
import { RecursoService } from 'src/app/services/recurso.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabla-recursos',
  templateUrl: './tabla-recursos.component.html',
  styleUrls: ['./tabla-recursos.component.css']
})
export class TablaRecursosComponent implements OnInit {
  divs:any[] = [];
  edicion:number;
  recursoParaHorario:Recurso;
  todasLasReservas:Reserva[]=[]
  reservas:Reserva[]=[];
  habilitarRecurso:number=null;

  constructor(private recursoService:RecursoService,private el: ElementRef, 
    private reservaService:ReservaService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRecursos();
    this.getReservas();
  }

  getRecursos(){
    this.recursoService.obtenerRecursos().subscribe(obj=>{
      this.divs=obj;
      //console.log(this.divs)
    },(error)=>{
      this.toastr.error('Ocurrió un error al obtener los Recursos','Oops!');
      console.log(error)
    })
  }

  editar(id:number){
    this.edicion=id;
  }

  guardarDatosRecurso(id:number){
    let rec;
    this.divs.some(objeto => {
      if (objeto.id === id) {
        rec = objeto;
        return true; // Termina la búsqueda al encontrar el objeto buscado
      }
    });
    rec.nombre=this.el.nativeElement.querySelector('#nombre-'+id).value
    rec.descripcion=this.el.nativeElement.querySelector('#descripcion-'+id).value
    this.recursoService.editarDatosRecurso(rec).subscribe(obj=>{
      //console.log(obj)
      this.getRecursos();
      this.edicion=null;
      this.toastr.success('Se editó el Recurso','Genial!');
    },(error)=>{
      this.toastr.error('Ocurrió un error al editar el Recurso','Oops!');
      console.log(error)
    })
  }

  verHorarios(recurso:Recurso){
    this.recursoParaHorario = recurso;
  }

  mostrarReservas(id:number){
    this.reservas=[];
    console.log(this.todasLasReservas)
    this.todasLasReservas.forEach(r => {
      if(r.asignacion.recurso.id==id){
        this.reservas.push(r);
      }
    });
  }


  getReservas(){
    this.reservaService.obtenerListaReservas().subscribe(obj=>{
      this.todasLasReservas=obj;
    },(error)=>{
      this.toastr.error('Ocurrió un error al obtener las Reservas','Oops!');
      console.log(error)
    })
  }

  onChange(event,id:number){
    this.divs.forEach(d => {
      if(d.id==id){
        d.eliminado=!event;
        console.log(d)
        this.recursoService.setHabilitado(d.id,!event).subscribe(obj=>{
          this.toastr.success('Se editó el Recurso','Genial!');
        },(error)=>{
          this.toastr.error('Ocurrió un error al habilitar el Recurso','Oops!');
          console.log(error)
        })
      }
    });
  }
}
