import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  UserName : string;
  constructor(public serviceEmployee : EmployeeService) { }

  ngOnInit():void {
    this.UserName = this.serviceEmployee.formData.FirstName;
  }

}
