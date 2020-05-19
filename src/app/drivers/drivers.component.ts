import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  UserName : String;
  constructor(public serviceEmployee: EmployeeService) { }

  ngOnInit(): void {
    this.UserName = this.serviceEmployee.formData.FirstName;
  }

}
