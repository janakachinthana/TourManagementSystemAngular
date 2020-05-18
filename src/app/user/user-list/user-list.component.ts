import { Component, OnInit, HostListener } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/shared/employee.model';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from 'src/app/app.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 100;
  
  constructor(
    private router: Router,
    public service : EmployeeService,
    private toastr : ToastrService,
    private dialog:MatDialog,
    public dialogRef: MatDialogRef<UserListComponent> ) { }

  ngOnInit() : void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
        this.service.list = [];}
  }

  adminLogin(){
    // this.router.navigateByUrl('employee');
    if (this.service.AdminUserName == null) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = '35%';
      dialogConfig.height = '70%';
      this.dialog.open(AdminLoginComponent, dialogConfig);
      this.dialogRef.close();
    }
  }

  populateForm(emp : Employee){
    this.service.formData = Object.assign({}, emp);
    this.AddOrEditEmployees(emp);
    this.service.AdminUserName = this.service.formData.FirstName;

   
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Employee record?')){
    this.service.deleteEmployee(id).subscribe(res=>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', ' Elephas vacations',{
        progressBar :true,
        positionClass:'toast-top-right',
        easing:'ease-in'
      });    });
  }}

  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
 
    this.dialog.open(LoginComponent)
  }
  AddOrEditEmployees(emp: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '70%';
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