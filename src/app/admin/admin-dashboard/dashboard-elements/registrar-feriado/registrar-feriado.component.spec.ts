import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFeriadoComponent } from './registrar-feriado.component';

describe('RegistrarFeriadoComponent', () => {
  let component: RegistrarFeriadoComponent;
  let fixture: ComponentFixture<RegistrarFeriadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarFeriadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarFeriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
