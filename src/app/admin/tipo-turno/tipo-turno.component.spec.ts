import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTurnoComponent } from './tipo-turno.component';

describe('TipoTurnoComponent', () => {
  let component: TipoTurnoComponent;
  let fixture: ComponentFixture<TipoTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
