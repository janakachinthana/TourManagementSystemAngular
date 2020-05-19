import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-confirmed-tour',
  templateUrl: './confirmed-tour.component.html',
  styleUrls: ['./confirmed-tour.component.scss']
})
export class ConfirmedTourComponent implements OnInit {
  UserName : String= "Admin";
  constructor(public serviceEmployee: EmployeeService) { }

  ngOnInit(): void {
    this.UserName = this.serviceEmployee.formData.FirstName;
  }
  

}
