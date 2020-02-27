import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { EmployeeService } from 'src/app/shared/employee.service';


@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})

export class EmployeeRegisterComponent implements OnInit {

  constructor(private service : EmployeeService) { }

  ngOnInit(): void {
  }

}
