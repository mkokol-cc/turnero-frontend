import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTipoTurnoRecursoComponent } from './asignar-tipo-turno-recurso.component';

describe('AsignarTipoTurnoRecursoComponent', () => {
  let component: AsignarTipoTurnoRecursoComponent;
  let fixture: ComponentFixture<AsignarTipoTurnoRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarTipoTurnoRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarTipoTurnoRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
