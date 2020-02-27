import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {

  constructor(public service: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)

    form.resetForm();
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
      this.insertRecord(form)

    }

    insertRecord(form : NgForm){
      this.service.postEmployeee(form.value).subscribe(res =>{
        this.resetForm(form)
      });
    }

}
