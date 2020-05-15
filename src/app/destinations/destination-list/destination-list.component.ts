import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/destination.service';
import { Destination } from 'src/app/shared/destination.model';
import { ToastrService } from 'ngx-toastr';
// import {  MatDialog, MatDialogConfig} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { DestinationComponent } from '../destination/destination.component';
import { DesPrintComponent } from '../des-print/des-print.component';
import { VehicleComponent } from 'src/app/vehicles/vehicle/vehicle.component';


@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.scss']
})
export class DestinationListComponent implements OnInit {

  constructor(public service : DestinationService, 
    private toastr : ToastrService,
    private dialog:MatDialog ) { }
    


  ngOnInit(): void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
      this.service.list = [];}
  }

  populateForm(des : Destination){
    this.service.formData = Object.assign({},des);
    this.AddOrEditDestinations(des);
    // this.service.formData = Object.assign({},des);
  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this record?')){
    this.service.deleteDestination(id).subscribe(res=>{
       this.service.refreshList();
       this.toastr.warning('deleted successfully', 'Elephas Vaccations');
    });
  }
  }

  AddOrEditDestinations(des : Destination){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.data = {des};
    dialogConfig.scrollStrategy ;
    this.dialog.open(DestinationComponent, dialogConfig);
  }



  genReport(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.maxHeight = '100%'
    dialogConfig.scrollStrategy ;
    dialogConfig.height= '100%'


  
    this.dialog.open(DesPrintComponent, dialogConfig);
  }



}
