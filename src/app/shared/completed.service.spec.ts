import { TestBed } from '@angular/core/testing';

import { CompletedService } from './completed.service';

describe('CompletedService', () => {
  let service: CompletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
