import { Component, OnInit } from '@angular/core';
import { HotelService } from '../shared/hotel.service';
import { EmployeeService } from '../shared/employee.service';



@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  UserName : String = "Admin";
  constructor(public serviceEmployee: EmployeeService) { }

  ngOnInit(): void {
    this.UserName = this.serviceEmployee.UserName.FirstName;
  }
  

}
