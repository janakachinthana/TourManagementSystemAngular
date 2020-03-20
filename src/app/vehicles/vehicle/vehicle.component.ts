import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  constructor(public service : VehicleService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.resetForm();
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
      RatePerKM :null
    }
  }

  onSubmit(form : NgForm){
    if(form.value.VehicleID==null)
    this.insertRecord(form);
  else
    this.updateRecord(form);
}
  
insertRecord(form: NgForm){
  this.service.postVehicle(form.value).subscribe(res =>{
    this.toastr.success('Inserted succesfully','VehicleMngmnt');
     this.resetForm(form) ; 
     this.service.refreshList();
  });
}
updateRecord(form: NgForm){
  this.service.putVehicle(form.value).subscribe(res =>{
    this.toastr.success('Updated succesfully','VehicleMngmnt');
    this.resetForm(form) ;
    this.service.refreshList(); 
  });
}

}
