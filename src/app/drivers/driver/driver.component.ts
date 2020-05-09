import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/shared/driver.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  constructor(public service : DriverService,
    public toastr : ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form!=null)  
      form.resetForm();
    this.service.formData = {
      DriverID : null,
      FirstName : '',
      LastName : '',
      NIC : '',
      Gender : '',
      Rate : '',
      DateOfBirth : '',
      PhoneNumber : '',
      LicenseNumber : ''
    }
  }

    onSubmit(form : NgForm){
      if(form.value.DriverID == null)
        this.insertRecord(form);
      else
        this.updateRecord(form);
    }
  
    insertRecord(form : NgForm){
      this.service.postDriver(form.value).subscribe(res => {
        this.toastr.success('Inserted Successfully','Driver Register');
        this.resetForm(form);
        this.service.refreshList();
      });
    }
  
    updateRecord(form : NgForm){
      this.service.putDriver(form.value).subscribe(res => {
        this.toastr.info('Updated Successfully','Driver Register');
        this.resetForm(form);
        this.service.refreshList();
      });
    }
}


