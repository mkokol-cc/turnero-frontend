import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRecursosComponent } from './select-recursos.component';

describe('SelectRecursosComponent', () => {
  let component: SelectRecursosComponent;
  let fixture: ComponentFixture<SelectRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
