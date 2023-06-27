import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTipoturnoComponent } from './datos-tipoturno.component';

describe('DatosTipoturnoComponent', () => {
  let component: DatosTipoturnoComponent;
  let fixture: ComponentFixture<DatosTipoturnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosTipoturnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTipoturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
