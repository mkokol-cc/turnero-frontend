import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTipoTurnoComponent } from './select-tipo-turno.component';

describe('SelectTipoTurnoComponent', () => {
  let component: SelectTipoTurnoComponent;
  let fixture: ComponentFixture<SelectTipoTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTipoTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTipoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
