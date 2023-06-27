import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recurso } from 'src/app/modelo/recurso';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-select-recursos',
  templateUrl: './select-recursos.component.html',
  styleUrls: ['./select-recursos.component.css']
})
export class SelectRecursosComponent implements OnInit {
  @Output() optionSelected = new EventEmitter<Recurso>();

  listaRecursos:Recurso[]=[];
  constructor(private recursoService:RecursoService) { }

  ngOnInit(): void {
    this.getTipoTurno();
  }

  getTipoTurno(){
    this.recursoService.obtenerRecursos().subscribe(obj=>{
      this.listaRecursos=obj;
      console.log(this.listaRecursos)
    })
  }

  onSelect(optionId: number) {
    this.listaRecursos.forEach(recurso => {
      if(optionId==recurso.id){
        this.optionSelected.emit(recurso);
      }
    })
  }
}
