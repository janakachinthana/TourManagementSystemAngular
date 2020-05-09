import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {
  UserName : String = "Admin";
  constructor(public serviceEmployee: EmployeeService) { }

  ngOnInit(): void {
    this.UserName = this.serviceEmployee.UserName.FirstName;
  }
  


}
