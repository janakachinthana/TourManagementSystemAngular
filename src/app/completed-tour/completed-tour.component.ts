import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserListComponent } from '../user/user-list/user-list.component';

@Component({
  selector: 'app-completed-tour',
  templateUrl: './completed-tour.component.html',
  styleUrls: ['./completed-tour.component.scss']
})
export class CompletedTourComponent implements OnInit {
  UserName : String = "Admin";
  constructor( public serviceEmployee: EmployeeService,
    private router: Router,
    private dialog:MatDialog ) { }

  ngOnInit(): void {
    this.UserName = this.serviceEmployee.formData.FirstName;
  }

  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    this.dialog.open(UserListComponent, dialogConfig);
  }

}
