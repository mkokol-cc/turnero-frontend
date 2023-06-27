import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  @Output() opcionElegida = new EventEmitter<number>();
  opcion:number;
  constructor() { }

  ngOnInit(): void {
  }

  enviarOpcionModal(a:number){
    this.opcionElegida.emit(a);
  }

}
