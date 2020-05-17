import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  UserName : String = "xxx";
  constructor(public serviceEmployee: EmployeeService) { }
  
  ngOnInit(): void {
    this.UserName = this.serviceEmployee.formData.FirstName;
  }
  

}
