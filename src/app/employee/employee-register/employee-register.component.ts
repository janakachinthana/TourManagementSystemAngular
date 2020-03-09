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
    this.service.formData ={ 
      EmployeeID : null,
      FullName : '',
      Address : '',
      BirthDay : '',
      NicNo : '',
      Contact : '',
      Email : ''
    }    
  }

  
    onSubmit(form : NgForm){
      if(form.value.EmployeeID == null )
      {
        
        if(form.value.FullName == '' || form.value.Address == '' || form.value.BirthDay == '' || form.value.NicNo == '' || form.value.Contact == '' || form.value.Email == '')
        {
        this.toastr.warning('Insert faild', 'EMP. Register');
        }
        else
        {
          this.insertRecord(form);
        }
      }
        
      else{
        if(form.value.FullName!= '' && form.value.Address != '' && form.value.BirthDay != '' && form.value.NicNo != '' && form.value.Contact != '' && form.value.Email != '')
        this.updateRecord(form);
      }
    }

    insertRecord(form : NgForm){
          this.service.postEmployeee(form.value).subscribe(res =>{
          this.toastr.success('Insert successfully', 'EMP. Register');
          this.resetForm();
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
