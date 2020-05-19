import { TestBed } from '@angular/core/testing';

import { HomeDestinationService } from './home-destination.service';

describe('HomeDestinationService', () => {
  let service: HomeDestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
