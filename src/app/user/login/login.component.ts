import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import {  MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: Employee;
  temp: Employee;
  
  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;


  constructor(public service : EmployeeService,
      private toastr : ToastrService,
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
        if(form.value.FillName != null || form.value.LastName != null || form.value.Address || null && form.value.BirthDay != null || form.value.NicNo != null || form.value.Contact != null || form.value.Email != null)
        this.updateRecord(form);
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
      this.service.putEmployeee(form.value).subscribe(res =>{
        this.toastr.info('Updated successfully', 'EMP. Register',{
          progressBar :true,
          positionClass:'toast-top-right',
          easing:'ease-in'
        });
        this.resetForm(form);
        this.service.refreshList();
        this.dialogRef.close();
      });
    }

}