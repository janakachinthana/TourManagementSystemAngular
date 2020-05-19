import { Component, OnInit, NgModule } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  UserName : String;
  constructor(public serviceEmployee: EmployeeService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.UserName = this.serviceEmployee.formData.FirstName;
  }

  navigate() {
    this.router.navigate(['home']);
}

}
