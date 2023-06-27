import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IOpcionVariable } from 'src/app/interfaces/iopcion-variable';
import { AsignacionRecursoTipoTurno } from 'src/app/modelo/asignacion-recurso-tipo-turno';
import { Recurso } from 'src/app/modelo/recurso';
import { TipoTurno } from 'src/app/modelo/tipo-turno';
import { AsignacionRecursoTipoTurnoService } from 'src/app/services/asignacion-recurso-tipo-turno.service';

import { RecursoService } from 'src/app/services/recurso.service';
import { TipoTurnoService } from 'src/app/services/tipo-turno.service';
//import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-registrar-feriado',
  templateUrl: './registrar-feriado.component.html',
  styleUrls: ['./registrar-feriado.component.css'],
  //providers: [MessageService]
  providers: [ConfirmationService,CheckboxModule]
})
export class RegistrarFeriadoComponent implements OnInit {
  //selectedValues:number[]=[];

  todasLasAsig:AsignacionRecursoTipoTurno[]=[];
  recursos:any[]=[];
  todasLasAsigChbx:any[]=[];
  fecha:string;
  
  selectedValues: {[key: number]: boolean} = {};

  constructor(
    private asignacionService:AsignacionRecursoTipoTurnoService, private toastr: ToastrService,
    //private messageService: MessageService
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAsignaciones();
  }


  getAsignaciones(){
    this.asignacionService.obtenerAsignaciones().subscribe(obj=>{
      this.todasLasAsig=obj;
      this.todasLasAsigChbx=obj;
      this.recursos = Array.from(
        this.todasLasAsig.reduce((map, asignacion) => {
          if (!map.has(asignacion.recurso.id)) {
            map.set(asignacion.recurso.id, asignacion.recurso);
          }
          return map;
        }, new Map()).values()
      );
      this.todasLasAsigChbx.forEach(a => a['seleccionado'] = false);
      this.recursos.forEach(r => r['seleccionado'] = false);
    })
  }

  seleccionarAsignaciones(recurso: any,event:any) {
    this.todasLasAsig.forEach(asig => {
      if(asig.recurso.id==recurso.id){
        this.selectedValues[asig.id]=event.checked
      }
    });
  }

  guardarFeriado(idAsignaciones:any[],fechaFormateada:string){
    /*
    let idAsigSel=[];
    let fechaPartes = this.fecha.split('-');
    let fechaFormateada = `${fechaPartes[2]}-${fechaPartes[1]}-${fechaPartes[0]}`;
    this.todasLasAsigChbx.forEach(asignacion => {
      if (asignacion.seleccionado) {
        idAsigSel.push(asignacion.id);
      }
    });*/
    //alert("voy a enviar esta fecha "+fechaFormateada);
    this.asignacionService.guardarFeriado(idAsignaciones,fechaFormateada).subscribe(obj=>{
      console.log("se enviaron los datos "+obj);
      this.toastr.success('Se registró el el día no laboral.','Genial!');
    },(error)=>{
      this.toastr.error('Ocurrió un error al registrar el día no laboral.','Oops!');
      console.log(error)
    })
  }








  //ESTO ANDA
  /*
  showConfirm() : void {
    const confirmDialog = document.createElement('div');
    confirmDialog.innerHTML = `
      <div class="confirm-message">
        <p>¿Estás seguro de que deseas continuar?</p>
        <button class="confirm-button">Sí</button>
        <button class="cancel-button">No</button>
      </div>
    `;
  
    confirmDialog.querySelector('.confirm-button').addEventListener('click', () => {
      // Acción a realizar si el usuario confirma
      alert("aceptaste")
      confirmDialog.remove();
    });
  
    confirmDialog.querySelector('.cancel-button').addEventListener('click', () => {
      // Acción a realizar si el usuario cancela
      alert("cancelaste")
      confirmDialog.remove();
    });
  
    confirmDialog.style.position = 'fixed';
    confirmDialog.style.top = '50%';
    confirmDialog.style.left = '50%';
    confirmDialog.style.transform = 'translate(-50%, -50%)';
    confirmDialog.style.zIndex = '9999';
  
    document.body.appendChild(confirmDialog);
  }*/
  

  
  
  
  /*{
    this.toastr.warning('¿Estás seguro?', 'Confirmación', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      tapToDismiss: false
    }).onTap.subscribe(() => {
      // Aquí puedes ejecutar lo que quieras hacer después de la confirmación
      alert("haz aceptado")
      //
      this.toastr.success('Tu acción ha sido realizada.', 'Hecho', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true,
        tapToDismiss: false
      });
    });
  }*/

  confirm() {
    const keysWithTrueValues = Object.entries(this.selectedValues).filter(([key, value]) => value).map(([key, value]) => key);
    if(this.fecha && keysWithTrueValues.length>0){
      let idAsigSel=[];
      let fechaPartes = this.fecha.split('-');
      let fechaFormateada = `${fechaPartes[2]}-${fechaPartes[1]}-${fechaPartes[0]}`;
      let mensaje='Estas seguro que quieres registrar como no laboral el dia '+this.fecha+'?'
      this.todasLasAsigChbx.forEach(asignacion => {
        if (keysWithTrueValues.includes(asignacion.id+"") && !asignacion.eliminado) {
          idAsigSel.push(asignacion.id);
          mensaje=mensaje+'<br>'+asignacion.recurso.nombre+' - '+asignacion.tipoTurno.nombre
        }
      });
      this.confirmationService.confirm({
          message: mensaje,
          accept: () => {
            this.guardarFeriado(idAsigSel,fechaFormateada)
          }
      });
    }else if(keysWithTrueValues.length==0){
      this.toastr.warning('Debe seleccionar los tipos de turno afectados por el día no laboral.','Atención!');
    }else{
      this.toastr.warning('Debe seleccionar una fecha.','Atención!');
    }
  }
}
