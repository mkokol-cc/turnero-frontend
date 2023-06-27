import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/modelo/recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent implements OnInit {

  listaRecursos:Recurso[];
  idHabilitado:number=-1;
  constructor(private recursoService:RecursoService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRecursos();
  }

  getRecursos():void{
    this.listaRecursos=[];
    this.recursoService.obtenerRecursos().subscribe(dato=>{
      this.listaRecursos=dato;
      console.log(this.listaRecursos)
    },
    (error) => {
      console.error(error);
      this.toastr.error('Ocurrió un error al obtener los Recursos','Oops!');
    });
  }

  editarRecurso(id:number){
    this.listaRecursos.forEach((obj: Recurso) => {
      if(id==obj.id){
        let nombre = document.getElementById("nombre-recurso-"+id) as HTMLInputElement;
        let descripcion = document.getElementById("descripcion-recurso-"+id) as HTMLInputElement;
        let nuevoRecurso:Recurso=obj;
        nuevoRecurso.descripcion = descripcion.value
        nuevoRecurso.nombre = nombre.value
        this.recursoService.registrarRecurso(nuevoRecurso).subscribe(dato=>{
          console.log(dato);
          this.toastr.success('Se editó el Recurso','Genial!');
        },(error)=>{
          console.log(error);
          this.toastr.error('Ocurrió un error al editar el Recurso','Oops!');
        })
      }
    })
    this.getRecursos();
    this.habilitarEdicion(-1);
  }

  habilitarEdicion(id:number){
    this.idHabilitado=id;
  }

  guardarCambios(r:Recurso){
    let nombre = document.getElementById("nombre-recurso-"+r.id) as HTMLInputElement;
    let descripcion = document.getElementById("descripcion-recurso-"+r.id) as HTMLInputElement;
    let nuevoRecurso:Recurso=r;
    nuevoRecurso.descripcion = descripcion.value
    nuevoRecurso.nombre = nombre.value
    this.recursoService.registrarRecurso(nuevoRecurso).subscribe(dato=>{
      console.log(dato);
      this.toastr.success('Se registró el Recurso','Genial!');
    },(error)=>{
      console.log(error);
      this.toastr.error('Ocurrió un error al registrar el Recurso','Oops!');
    })
  }

}
