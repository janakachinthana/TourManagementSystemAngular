import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeRegisterComponent } from '../employee/employee-register/employee-register.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData : EmployeeRegisterComponent;
  constructor() { }
}
