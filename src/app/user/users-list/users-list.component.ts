import { Component, OnInit, HostListener } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EmployeeRegisterComponent } from 'src/app/employee/employee-register/employee-register.component';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

 
  isShow: boolean;
  topPosToStartShowing = 100;
  
  constructor(
    public service : EmployeeService,
    private toastr : ToastrService,
    private dialog:MatDialog ) { }

  ngOnInit() : void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
        this.service.list = [];}
  }

  populateForm(emp : Employee){
    this.service.formData = Object.assign({}, emp);
    this.AddOrEditVehicles(emp);

   
  }


  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
 
    this.dialog.open(EmployeeRegisterComponent)
  }
  AddOrEditVehicles(emp: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '40%';
    dialogConfig.data = {emp};
    this.dialog.open(LoginComponent, dialogConfig);
  }
  
  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}