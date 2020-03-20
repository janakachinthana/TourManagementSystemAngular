import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
}) 
export class VehicleListComponent implements OnInit {

  constructor(public service : VehicleService,
    private toastr : ToastrService ) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(veh : Vehicle){
    this.service.formData= veh;
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Vehicle?')){
    this.service.deleteVehicle(id).subscribe(res=>{
      this.service.refreshList();
      this.toastr.warning('Deleted succesfully','VHCL.MNGMNT'); 
    });
  }}
}
