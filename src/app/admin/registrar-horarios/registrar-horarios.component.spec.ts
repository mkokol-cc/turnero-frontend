import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarHorariosComponent } from './registrar-horarios.component';

describe('RegistrarHorariosComponent', () => {
  let component: RegistrarHorariosComponent;
  let fixture: ComponentFixture<RegistrarHorariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarHorariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
