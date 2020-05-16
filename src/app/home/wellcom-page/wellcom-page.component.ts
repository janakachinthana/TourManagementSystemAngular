import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/shared/employee.service';
import { UserListComponent } from 'src/app/user/user-list/user-list.component';

@Component({
  selector: 'app-wellcom-page',
  templateUrl: './wellcom-page.component.html',
  styleUrls: ['./wellcom-page.component.scss']
})
export class WellcomPageComponent implements OnInit {

  constructor(private dialog:MatDialog,
              public service: EmployeeService,
              public dialogRef: MatDialogRef<WellcomPageComponent> ) { }

  ngOnInit(): void {
  }

  welcome(){
    this.service.refreshList();
    // this.UserName = "Janaka";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    this.dialog.open(UserListComponent, dialogConfig);
    // this.UserName = this.service.UserName.FirstName;
    this.dialogRef.close();
  }

}
