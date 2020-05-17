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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: Employee;
  temp: Employee;
  currentUser : Prevelent;
  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;
  authService: any;


  constructor(public service : EmployeeService,
    private router: Router,
      private toastr : ToastrService,
      private dialog:MatDialog ,
      private _activateRouter : ActivatedRoute,
      @Inject(MAT_DIALOG_DATA) public data,
       public dialogRef: MatDialogRef<LoginComponent>
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
        this.toastr.warning('Update faild', 'EMP. Eliphase Vacation');
      }
    }

    insertRecord(form : NgForm){
          this.service.postEmployeee(form.value).subscribe(res =>{
            this.dialogRef.close();
          this.toastr.success('Insert successfully', 'EMP. Elaphase Vacation',{
          progressBar :true,
      positionClass:'toast-top-right'
          });
          this.resetForm(form);
          this.service.refreshList();
          });

    }

    updateRecord(form : NgForm){
      if(form.value.Password == this.temp.Password )
      {
        // this.service.formData.FirstName = this.formData.FirstName;
        this.service.AdminUserName = form.value.FirstName;
        this.currentUser = Object.assign({}, form.value);
        this.service.UserName = Object.assign({},form.value);
        this.router.navigateByUrl('main');
        this.toastr.success('Login Successfully', 'EMP. Eliphase Vacation');
        this.dialogRef.close();
      }
      else
      {
      this.toastr.warning('Login Failed ', 'EMP. Eliphase Vacation');
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