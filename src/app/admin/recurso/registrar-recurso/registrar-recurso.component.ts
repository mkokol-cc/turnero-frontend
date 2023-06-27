import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/modelo/horario';
import { Recurso } from 'src/app/modelo/recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-recurso',
  templateUrl: './registrar-recurso.component.html',
  styleUrls: ['./registrar-recurso.component.css']
})
export class RegistrarRecursoComponent implements OnInit {

  recurso : Recurso = new Recurso();
  listaHorarios:Horario[];
  constructor(private recursoServicio:RecursoService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  ngSubmit(){
    if(this.listaHorarios){
      this.recurso.horarios=this.listaHorarios;
    }
    console.log(this.recurso);
    this.recursoServicio.registrarRecurso(this.recurso).subscribe(dato=>{
      this.toastr.success('Se registró el Recurso','Genial!');
      //console.log("SE GUARDO LO SIGUIENTE: "+dato);//MANEJO DE EXITO
    },(error)=>{
      this.toastr.error('Ocurrió un error al registrar el Recurso','Oops!');
      console.log(error)
    }
    )
  }

  onButtonClick(horariosDelHijo: Horario[]) {
    this.listaHorarios=horariosDelHijo;
    //console.log(this.listaHorarios);
  }
}
