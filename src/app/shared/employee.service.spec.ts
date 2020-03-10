import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { VehicleService } from './vehicle.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


