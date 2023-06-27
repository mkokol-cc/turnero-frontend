import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRecursosComponent } from './tabla-recursos.component';

describe('TablaRecursosComponent', () => {
  let component: TablaRecursosComponent;
  let fixture: ComponentFixture<TablaRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
