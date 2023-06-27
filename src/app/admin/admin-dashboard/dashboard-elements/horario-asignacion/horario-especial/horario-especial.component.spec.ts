import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioEspecialComponent } from './horario-especial.component';

describe('HorarioEspecialComponent', () => {
  let component: HorarioEspecialComponent;
  let fixture: ComponentFixture<HorarioEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
