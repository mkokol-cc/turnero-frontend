import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTipoTurnoRecursosComponent } from './mostrar-tipo-turno-recursos.component';

describe('MostrarTipoTurnoRecursosComponent', () => {
  let component: MostrarTipoTurnoRecursosComponent;
  let fixture: ComponentFixture<MostrarTipoTurnoRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarTipoTurnoRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarTipoTurnoRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
