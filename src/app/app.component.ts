import { Component } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './user/login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { EmployeeService } from './shared/employee.service';
import { Router } from '@angular/router';
import { WellcomPageComponent } from './home/wellcom-page/wellcom-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EliphaseVacation';

  constructor(
    private router: Router,
    private service : EmployeeService,
    private dialog:MatDialog ) { }

    UserName : String ;
    

  ngOnInit(): void {
    
    this.service.refreshList();
    // this.UserName = "Janaka";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    this.dialog.open(WellcomPageComponent, dialogConfig);
    this.UserName = this.service.UserName.FirstName;
  }

  viewUserName(){
     this.UserName = this.service.UserName.FirstName;
  }

  logout(){
    this.service.refreshList();
    this.service.AdminUserName = null;
    this.service.UserName= null;
    this.router.navigateByUrl('');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    this.dialog.open(WellcomPageComponent, dialogConfig);
  }
}
