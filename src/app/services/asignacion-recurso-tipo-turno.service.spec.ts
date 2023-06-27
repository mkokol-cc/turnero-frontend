import { TestBed } from '@angular/core/testing';

import { AsignacionRecursoTipoTurnoService } from './asignacion-recurso-tipo-turno.service';

describe('AsignacionRecursoTipoTurnoService', () => {
  let service: AsignacionRecursoTipoTurnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionRecursoTipoTurnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
