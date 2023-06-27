import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonVerReservasComponent } from './boton-ver-reservas.component';

describe('BotonVerReservasComponent', () => {
  let component: BotonVerReservasComponent;
  let fixture: ComponentFixture<BotonVerReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonVerReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonVerReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
