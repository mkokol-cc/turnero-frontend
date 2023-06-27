import { TestBed } from '@angular/core/testing';

import { TipoTurnoService } from './tipo-turno.service';

describe('TipoTurnoService', () => {
  let service: TipoTurnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTurnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
