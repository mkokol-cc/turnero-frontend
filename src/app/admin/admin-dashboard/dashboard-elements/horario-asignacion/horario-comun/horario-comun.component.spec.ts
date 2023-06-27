import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioComunComponent } from './horario-comun.component';

describe('HorarioComunComponent', () => {
  let component: HorarioComunComponent;
  let fixture: ComponentFixture<HorarioComunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioComunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
