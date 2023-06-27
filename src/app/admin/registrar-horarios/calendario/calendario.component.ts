import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ViewChild } from '@angular/core'
import { Dia } from 'src/app/modelo/dia';
import { Horario } from 'src/app/modelo/horario';
//import { DiaService } from 'src/app/services/dia.service';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  
  ngOnInit(): void {
    
  }/*
  @ViewChild('contenedor', { static: true }) contenedor: ElementRef;
 
  dias:Dia[];
  divsLun = [];
  divsMar = [];
  divsMie = [];
  divsJue = [];
  divsVie = [];
  divsSab = [];
  divsDom = [];

  constructor(private service:DiaService) { }

  ngOnInit(): void {
    this.obtenerHorariosDia()
  }

  ngAfterViewInit(): void{
  }

  clickMe(){
    this.dias.forEach((obj: Dia) => {
      console.log(`ID: ${obj.id}, Name: ${obj.nombre}`);

      switch (obj.id) {
        case 1:
          this.divsLun=this.generarGraficoDia(obj);
          break;
        case 2:
          this.divsMar=this.generarGraficoDia(obj);
          break;
        case 3:
          this.divsMie=this.generarGraficoDia(obj);
          break;
        case 4:
          this.divsJue=this.generarGraficoDia(obj);
          break;
        case 5:
          this.divsVie=this.generarGraficoDia(obj);
          break;
        case 6:
          this.divsSab=this.generarGraficoDia(obj);
          break;
        case 7:
          this.divsDom=this.generarGraficoDia(obj);
          break;
        default:
          break;
      }
    });
  }



  generarGraficoDia(dia:Dia):string[]{
    //obtenemos los horarios laborables del dia
    let horario:Horario[] = dia.horarios;
    let divs = [];
    let primero:boolean = true;
    let ultimoHasta:string = "00:00";
    //para cada uno generamos un div
    horario.forEach((obj: Horario) => {
      if(primero){
        const div = this.generarGrafico(0,this.convertTimeToMinutes(obj.desde),false);
        divs.push(div);
        primero = false;
      }else{
        const div = this.generarGrafico(this.convertTimeToMinutes(ultimoHasta),this.convertTimeToMinutes(obj.desde),false);
        divs.push(div);
      }
      const div = this.generarGrafico(this.convertTimeToMinutes(obj.desde),this.convertTimeToMinutes(obj.hasta),true);
      divs.push(div);
      ultimoHasta = obj.hasta;
    });
    const div = this.generarGrafico(this.convertTimeToMinutes(ultimoHasta),1440,false);
    divs.push(div);
    //limpiamos el elemento y le ponemos los nuevos divs generados
    console.log("mis divs: "+divs);
    return divs;
  }

  generarGrafico(desde:number,hasta:number,laborable:boolean):any{
    let ancho=hasta-desde;
    //un dia tiene 1440 minutos, 100% dividido 1440 = 0.06944444444
    if(laborable){
      return {width:ancho*0.06944444444,height:"17px",background:'lightgreen'};
      //return '<div class"bg-success" style="width:'+ancho*0.06944444444+'%,height:17px"></div>'
    }
    return {width:ancho*0.06944444444,height:"10px",background:'lightblue'};
  }

  obtenerHorariosDia(){
    this.service.obtenerDias().subscribe(dato=>{
      this.dias=dato;
    });
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    console.log([hours, minutes]);
    return hours * 60 + minutes;
  }*/

}
