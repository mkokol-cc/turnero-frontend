import { TestBed } from '@angular/core/testing';

import { ComponentReloaderService } from './component-reloader.service';

describe('ComponentReloaderService', () => {
  let service: ComponentReloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentReloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
