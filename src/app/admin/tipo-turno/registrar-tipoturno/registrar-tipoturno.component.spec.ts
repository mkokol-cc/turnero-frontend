import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTipoturnoComponent } from './registrar-tipoturno.component';

describe('RegistrarTipoturnoComponent', () => {
  let component: RegistrarTipoturnoComponent;
  let fixture: ComponentFixture<RegistrarTipoturnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarTipoturnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarTipoturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
