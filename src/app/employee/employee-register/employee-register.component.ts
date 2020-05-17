import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import {  MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss'
]
})

export class EmployeeRegisterComponent implements OnInit {
  formData: Employee;
  temp: Employee;
  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;


  constructor(public service : EmployeeService,
      private toastr : ToastrService,
      @Inject(MAT_DIALOG_DATA) public data,
      public dialogRef: MatDialogRef<EmployeeRegisterComponent>) { }
   

 handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);
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
      this.temp = Object.assign({}, this.data.emp);
      this.service.formData = {
      EmployeeID : this.temp.EmployeeID,
      FirstName : this.temp.FirstName,
      LastName : this.temp.LastName,
      Password: this.temp.Password,
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
      Password : "ABCabc123",
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
  if(form.value.EmployeeID == null ){  
    if(form.value.FirstName == '' || form.value.LastName == '' ||form.value.Address == '' || form.value.BirthDay == '' || form.value.NicNo == '' || form.value.Contact == '' || form.value.Email == ''|| form.value.Image == '') {
        this.toastr.warning('Insert faild', 'EMP. Eliphase Vacation');
    }else{
      if (form.value.BirthDay > "2005-01-01" || form.value.BirthDay < "1943-01-01") {
          this.toastr.warning('Your Birth Day should be less than "2005-01-01" and grater than "1943-01-01" ', 'Eliphase Vacation');
      }else{
            this.insertRecord(form);
           }  
         }
  }else{
    if(form.value.FirstName != null || form.value.LastName != null || form.value.Address || null && form.value.BirthDay != null || form.value.NicNo != null || form.value.Contact != null || form.value.Email != null){  
        this.updateRecord(form);
    }else
        this.toastr.warning('Update faild', 'EMP. Eliphase Vacation');
       }
  }

insertRecord(form : NgForm){
  this.service.postEmployeee(form.value).subscribe(res =>{
    this.dialogRef.close();
    this.toastr.success('Employee Added successfully', 'Elaphase Vacation',{
      progressBar :true,
      positionClass:'toast-top-right'
    });
    this.resetForm(form);
    this.service.refreshList();
  });
}

updateRecord(form : NgForm){
  if (confirm('Are you sure want to Update this Employee record?')){
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

demo(){
  this.service.formData.FirstName = "Kusal"; 
  this.service.formData.LastName = "Perea"; 
  this.service.formData.Address = "No87, Colombo 7"; 
  this.service.formData.Contact = "119876543"; 
  this.service.formData.Email = "kusalperera@gmail.com"; 
  this.service.formData.NicNo = "851421719V"; 
  this.service.formData.BirthDay = "1985-02-02";
  this.service.formData.Password = "ABCabc123" 
}

}