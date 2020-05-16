import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserListComponent } from '../user/user-list/user-list.component';
import { LoginComponent } from '../user/login/login.component';
import { AdminLoginComponent } from '../user/admin-login/admin-login.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
UserName : String = "Admin";
  constructor(
    public service : EmployeeService,
    private dialog:MatDialog ) { }

  ngOnInit(): void {

    if (this.service.AdminUserName == null) {
      
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '35%';
    dialogConfig.height = '60%';
    this.dialog.open(AdminLoginComponent, dialogConfig);
    }
  }

}
