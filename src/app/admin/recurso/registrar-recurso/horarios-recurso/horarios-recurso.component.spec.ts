import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosRecursoComponent } from './horarios-recurso.component';

describe('HorariosRecursoComponent', () => {
  let component: HorariosRecursoComponent;
  let fixture: ComponentFixture<HorariosRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
