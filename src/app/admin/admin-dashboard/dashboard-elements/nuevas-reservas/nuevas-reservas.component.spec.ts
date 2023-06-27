import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevasReservasComponent } from './nuevas-reservas.component';

describe('NuevasReservasComponent', () => {
  let component: NuevasReservasComponent;
  let fixture: ComponentFixture<NuevasReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevasReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevasReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
