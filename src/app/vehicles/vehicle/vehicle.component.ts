import { Component, OnInit, Inject } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { NgForm } from '@angular/forms';
// import {  MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  formData: Vehicle;
  temp: Vehicle;
 


  constructor(public service : VehicleService,
      private toastr : ToastrService,
      @Inject(MAT_DIALOG_DATA) public data,
      private dialog:MatDialog,
       public dialogRef: MatDialogRef<VehicleComponent>
    ) { }

  ngOnInit() :void{
    
    if (this.data.veh == null) {
       this.resetForm();
      } else {

        // fill all the field with related data in the pop-up
         this.temp = Object.assign({}, this.data.veh);
         this.service.formData = {
            VehicleID: this.temp.VehicleID, 
            VehicleNo : this.temp.VehicleNo,
            Brand : this.temp.Brand,
            Model : this.temp.Model,
            RegistrationNo : this.temp.RegistrationNo,
            ManuYr : this.temp.ManuYr,
            NoOfSeats:  this.temp.NoOfSeats,
            OwnersName : this.temp.OwnersName,
            OwneresID : this.temp.OwneresID,
            OwnersContact : this.temp.OwnersContact,
            VehicleInsuaranceNo : this.temp.VehicleInsuaranceNo,
            RatePerKM : this.temp.RatePerKM,
            category : this.temp.category,
        };
      }
  }
 



  resetForm(form? : NgForm){
    if(form != null){
      form.resetForm();}
    this.service.formData= {
      VehicleID: null, 
      VehicleNo :'',
      Brand :'',
      Model :'',
      RegistrationNo :'',
      ManuYr :null,
      NoOfSeats: null,
      OwnersName :'',
      OwneresID :'',
      OwnersContact :'',
      VehicleInsuaranceNo :'',
      RatePerKM :null,
      category : ''
    };
  }

  onSubmit(form : NgForm){
    if(form.value.VehicleID==null)
    this.insertRecord(form);
  else
    this.updateRecord(form);
}
  

insertRecord(form: NgForm){
  this.service.postVehicle(form.value).subscribe(res =>{
    this.dialogRef.close();
    this.toastr.success('inserted successfully', ' Elephas vacations',{
      progressBar :true,
      positionClass:'toast-top-right'
      // positionClass:'toast-top-middle',
    });      this.resetForm(form);
      this.service.refreshList();
  });
}


updateRecord(form: NgForm){
  this.service.putVehicle(form.value).subscribe(res =>{
    this.toastr.info('Edited successfully', ' Elephas vacations',{
      progressBar :true,
      positionClass:'toast-top-right',
      easing:'ease-in'
      // positionClass:'toast-top-middle',
    });
    this.resetForm(form);
    this.service.refreshList();
    this.dialogRef.close();
  });
}

fillForm(){
  this.service.formData= {
    VehicleID : null,
    VehicleNo :"cp KR 1298",
    Brand :"Toyota",
    Model :"Prius",
    RegistrationNo :"CAR45645",
    ManuYr :2015,
    NoOfSeats: 4,
    OwnersName :"A. Appuhami",
    OwneresID :"786545128v",
    OwnersContact :"0771532456",
    VehicleInsuaranceNo :"INS3216551",
    RatePerKM :70,
    category : "car"
  };
}


}
