import { Component, OnInit, HostListener } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { VehiclesComponent } from '../vehicles.component';
import { VehicleComponent } from '../vehicle/vehicle.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
}) 
export class VehicleListComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 100;
  
  constructor(
    public service : VehicleService,
    private toastr : ToastrService,
    private dialog:MatDialog ) { }

  ngOnInit() : void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
        this.service.list = [];}
  }

  populateForm(veh : Vehicle){
    this.service.formData = Object.assign({}, veh);
    this.AddOrEditVehicles(veh);

    //  const dialogConfig = new MatDialogConfig();
    //  dialogConfig.data={veh};

    //  this.dialog.open(VehicleComponent,dialogConfig);
   
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Vehicle?')){
    this.service.deleteVehicle(id).subscribe(res=>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', ' Elephas vacations',{
        progressBar :true,
        positionClass:'toast-top-right',
        easing:'ease-in'
        // positionClass:'toast-top-middle',
      });    });
  }}

  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
 
    this.dialog.open(VehicleComponent)
  }
  AddOrEditVehicles(veh: Vehicle) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.height = '94%';
    dialogConfig.data = {veh};
    this.dialog.open(VehicleComponent, dialogConfig);
  }
  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
