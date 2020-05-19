import { Component, OnInit, Inject } from '@angular/core';
import { DriverService } from 'src/app/shared/driver.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Driver } from 'src/app/shared/driver.model';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  formData: Driver;
  temp: Driver;

  constructor(public service : DriverService,
    public toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<DriverComponent>) { }

  ngOnInit(): void {
    if(this.data.d == null) {
      this.resetForm();
    } else {
     // fill all the field with related data in the pop-up
     this.temp = Object.assign({}, this.data.d);
     this.service.formData = {
       DriverID: this.temp.DriverID,
       FirstName: this.temp.FirstName,
       LastName: this.temp.LastName,
       NIC: this.temp.NIC,
       Gender: this.temp.Gender,
       Rate: this.temp.Rate,
       DateOfBirth: this.temp.DateOfBirth,
       PhoneNumber: this.temp.PhoneNumber,
       LicenseNumber: this.temp.LicenseNumber,
       Image : this.temp.Image
      };
    }
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
      LicenseNumber : '',
      Image : '',
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
        this.dialogRef.close();
        this.toastr.success('Inserted Successfully','Elephas Vacations');
        this.resetForm(form);
        this.service.refreshList();
      });
    }
  
    updateRecord(form : NgForm){
      this.service.putDriver(form.value).subscribe(res => {
        this.toastr.info('Updated Successfully','Elephas Vacations');
        this.resetForm(form);
        this.service.refreshList();
        this.dialogRef.close();
      });
    }
    
     insertDemo(){
      this.service.formData = {
        DriverID : null,
        FirstName : 'John',
        LastName : 'Walker',
        NIC : '975555555V',
        Gender : 'Male',
        Rate : '100',
        DateOfBirth : '1997-12-12',
        PhoneNumber : '0770322305',
        LicenseNumber : 'A1111111A',
        Image : ''
      }
    }
}


