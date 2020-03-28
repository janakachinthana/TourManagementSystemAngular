import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})

export class EmployeeRegisterComponent implements OnInit {
  

  constructor(public service: EmployeeService,
   
 private toastr : ToastrService) { }
 
 ngOnInit() {
  this.resetForm();
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
      Image : ''
    }    
  }

  
    onSubmit(form : NgForm){
      if(form.value.EmployeeID == null )
      {
        
        if(form.value.FirstName == '' || form.value.LastName == '' ||form.value.Address == '' || form.value.BirthDay == '' || form.value.NicNo == '' || form.value.Contact == '' || form.value.Email == ''|| form.value.Image == '')
        {
        this.toastr.warning('Insert faild', 'EMP. Register');
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
        this.toastr.warning('Update faild', 'EMP. Register');
      }
    }

    insertRecord(form : NgForm){
          this.service.postEmployeee(form.value).subscribe(res =>{
          this.toastr.success('Insert successfully', 'EMP. Register');
          this.resetForm(form);
          this.service.refreshList();
          });

    }

    updateRecord(form : NgForm){
      this.service.putEmployeee(form.value).subscribe(res =>{
        this.toastr.info('Updated successfully', 'EMP. Register');
        this.resetForm(form);
        this.service.refreshList();
      });
    }

}