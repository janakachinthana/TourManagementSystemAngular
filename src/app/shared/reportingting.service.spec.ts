import { TestBed } from '@angular/core/testing';

import { ReportingtingService } from './reportingting.service';

describe('ReportingtingService', () => {
  let service: ReportingtingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportingtingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
