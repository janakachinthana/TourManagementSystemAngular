import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss']
})
export class GuidesComponent implements OnInit {
  UserName : string;
  constructor(public serviceEmployee : EmployeeService) { }

  ngOnInit(): void {
    this.UserName = this.serviceEmployee.formData.FirstName;
  }

}
