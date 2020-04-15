import { Employee } from "./employee.model";
import { Vehicle } from './vehicle.model';

describe('Vehicle', () => {
  it('should create an instance', () => {
    expect(new Vehicle()).toBeTruthy();
  });
});

describe('Employee', () => {
  it('should create an instance', () => {
    expect(new Employee()).toBeTruthy();
  });
});
