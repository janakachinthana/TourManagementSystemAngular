import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, RouterLink, ActivatedRoute, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CustomersComponent } from 'src/app/customers/customers.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { Prevelent } from 'src/app/shared/prevelent.model';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  formData: Employee;
  temp: Employee;
  currentUser : Prevelent;
  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;
  authService: any;
  UserName : String;
  Password : String;

  constructor(public service : EmployeeService,
    private router: Router,
      private toastr : ToastrService,
      private dialog:MatDialog ,
      private _activateRouter : ActivatedRoute,
      @Inject(MAT_DIALOG_DATA) public data,
       public dialogRef: MatDialogRef<AdminLoginComponent>
    ) { }


 handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);

  //Show image preview
  var reader = new FileReader();
  reader.onload = (event:any) => {
    this.imageUrl = event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload);
}
 
ngOnInit() :void{
  
    
  if (this.data.emp == null) {
     this.resetForm();
    } else {

      // fill all the field with related data in the pop-up
       this.temp = Object.assign({}, this.data.emp);
       this.service.formData = {
        EmployeeID : this.temp.EmployeeID,
        FirstName : this.temp.FirstName,
        LastName : this.temp.LastName,
        Password : null,
        Address : this.temp.Address,
        BirthDay : this.temp.BirthDay,
        NicNo : this.temp.NicNo,
        Contact : this.temp.Contact,
        Email : this.temp.Email,
        Image : this.temp.Image,
      };
    }
}

  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();
    this.service.formData ={ 
      EmployeeID : null,
      FirstName : '',
      LastName : '',
      Password : '',
      Address : '',
      BirthDay : '',
      NicNo : '',
      Contact : '',
      Email : '',
      Image : null,
    }    
    this.imageUrl = "/assets/img/img.jpg"
  }

  
    onSubmit(form : NgForm){
      if(form.value.EmployeeID == null )
      {
        
        if(form.value.FirstName == '' || form.value.LastName == '' ||form.value.Address == '' || form.value.BirthDay == '' || form.value.NicNo == '' || form.value.Contact == '' || form.value.Email == ''|| form.value.Image == '')
        {
        this.toastr.warning('Insert faild', 'EMP. Eliphase Vacation');
        }
        else
        {
          this.insertRecord(form);
        }
      }
        
      else{
        if(form.value.FirstName == this.temp.LastName )
        this.dialogRef.close();
        else
        this.toastr.warning('Update faild', 'EMP. Elephas Vacation');
      }
    }

    insertRecord(form : NgForm){
          this.service.postEmployeee(form.value).subscribe(res =>{
            this.dialogRef.close();
          this.toastr.success('Insert successfully', 'EMP. Elephas Vacation',{
          progressBar :true,
      positionClass:'toast-top-right'
          });
          this.resetForm(form);
          this.service.refreshList();
          });

    }

    updateRecord(form : NgForm){
      if(form.value.FirstName == "Admin" && form.value.LastName == "Admin"){
        this.service.AdminUserName = "Admin"
        this.toastr.success('Admin Login Successfully', 'Elephas Vacation');
        this.dialogRef.close();
      }
      else{
        if (form.value.FirstName != "Admin") {
          this.toastr.warning('User Name Invalied...! ', 'EMP. Elephas Vacation');
        }
        else{
      this.toastr.warning('Password Invalied...! ', 'EMP. Elephas Vacation');
        }
      }
    }

    cancelAdminLogin(){
      if (this.service.AdminUserName == null && this.service.UserName == null) {
        this.dialogRef.close();
      this.router.navigateByUrl('main');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = '100%';
        dialogConfig.height = '100%';
        this.service.refreshList();
        this.dialog.open(UserListComponent, dialogConfig);
        
      }
      else{
        this.dialogRef.close();
        this.router.navigateByUrl('home');
      }
      
    }

  backToUserList(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    this.dialog.open(UserListComponent, dialogConfig);
  }

}