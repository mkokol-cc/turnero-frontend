import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAsignacionesComponent } from './tabla-asignaciones.component';

describe('TablaAsignacionesComponent', () => {
  let component: TablaAsignacionesComponent;
  let fixture: ComponentFixture<TablaAsignacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaAsignacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
