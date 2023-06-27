import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoturnoComponent } from './tabla-tipoturno.component';

describe('TablaTipoturnoComponent', () => {
  let component: TablaTipoturnoComponent;
  let fixture: ComponentFixture<TablaTipoturnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaTipoturnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
