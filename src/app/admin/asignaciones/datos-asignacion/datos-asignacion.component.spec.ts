import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAsignacionComponent } from './datos-asignacion.component';

describe('DatosAsignacionComponent', () => {
  let component: DatosAsignacionComponent;
  let fixture: ComponentFixture<DatosAsignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAsignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
