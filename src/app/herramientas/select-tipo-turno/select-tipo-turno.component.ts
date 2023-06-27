import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';

@Component({
  selector: 'app-select-tipo-turno',
  templateUrl: './select-tipo-turno.component.html',
  styleUrls: ['./select-tipo-turno.component.css']
})
export class SelectTipoTurnoComponent implements OnInit {
  @Output() optionSelected = new EventEmitter<TipoTurno>();

  listaTipoTurno:TipoTurno[]=[];
  constructor(private tipoTurnoService:TipoTurnoService) { }

  ngOnInit(): void {
    this.getTipoTurno();
  }

  getTipoTurno(){
    this.tipoTurnoService.obtenerTiposDeTurno().subscribe(obj=>{
      this.listaTipoTurno=obj;
      console.log(this.listaTipoTurno)
    })
  }

  onSelect(optionId: number) {
    this.listaTipoTurno.forEach(turno => {
      if(optionId==turno.id){
        this.optionSelected.emit(turno);
      }
    })
  }

}
