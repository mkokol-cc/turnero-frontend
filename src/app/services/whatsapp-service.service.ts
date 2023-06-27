import { Injectable } from '@angular/core';
import { Client } from 'whatsapp-web.js';


@Injectable({
  providedIn: 'root'
})
export class WhatsappServiceService {

  constructor() { 
    const whatsappWeb = require('..\..\assets\whatsapp.js');
  }

  enviarMensaje(mensaje:string,numero:string){  
    
  }

  generarQr(){

  }

  login(){

  }
}
