import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentReloaderService {
  private reloadComponentSubject = new Subject<any>();

  // Método que será utilizado por el componente emisor para solicitar la recarga del componente receptor
  reloadComponent() {
    this.reloadComponentSubject.next();
  }

  // Método que será utilizado por el componente receptor para suscribirse al evento de recarga
  onReloadComponent() {
    return this.reloadComponentSubject.asObservable();
  }
}
