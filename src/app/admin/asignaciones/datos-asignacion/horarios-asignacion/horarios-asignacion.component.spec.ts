import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosAsignacionComponent } from './horarios-asignacion.component';

describe('HorariosAsignacionComponent', () => {
  let component: HorariosAsignacionComponent;
  let fixture: ComponentFixture<HorariosAsignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosAsignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
