import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAsignacionComponent } from './horario-asignacion.component';

describe('HorarioAsignacionComponent', () => {
  let component: HorarioAsignacionComponent;
  let fixture: ComponentFixture<HorarioAsignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioAsignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
