import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-estimated-tours',
  templateUrl: './estimated-tours.component.html',
  styleUrls: ['./estimated-tours.component.scss']
})
export class EstimatedToursComponent implements OnInit {
  UserName : string;
  constructor(public serviceEmployee : EmployeeService) { }

  ngOnInit(): void {
    this.UserName = this.serviceEmployee.formData.FirstName;
  }

}
