import { TestBed } from '@angular/core/testing';

import { HomeHotelService } from './home-hotel.service';

describe('HomeHotelService', () => {
  let service: HomeHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
