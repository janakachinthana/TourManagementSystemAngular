import { Component, OnInit, Inject } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { VehiclePrintComponent } from '../vehicle-print/vehicle-print.component';
import * as html2pdf from 'html2pdf.js'
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-singleveh',
  templateUrl: './singleveh.component.html',
  styleUrls: ['./singleveh.component.scss']
})
export class SinglevehComponent implements OnInit {

  public VehicalModel : string;

  VehicleX : Vehicle;
  temp: number;
  VehID : number;


  employeeFirst : string;
  employeeSecond : string;


  vehicleID : number;
  VehicleNo : string;
  Brand :string
  Model :string
  RegistrationNo :string
  ManuYr :number;
  NoOfSeats :number;
  OwnersName :string
  OwneresID :string
  OwnersContact :string
  VehicleInsuaranceNo :string
  RatePerKM :number;
  category : String 

  constructor( public service : VehicleService,
    public serviceEmp : EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog:MatDialog ) { }

  ngOnInit(): void {
    this.service.refreshList();
    this.serviceEmp.refreshList();
    this.temp =this.data.vehID;

    this.employeeFirst= this.serviceEmp.formData.FirstName;
    this.employeeSecond= this.serviceEmp.formData.LastName;

    this.service.GetSingleVehicle(this.temp).subscribe(data => {
      this.VehicleX = data;
      
      this.vehicleID= this.VehicleX.VehicleID;
      this.VehicleNo = this.VehicleX.VehicleNo;
      this.Brand = this.VehicleX.Brand;
      this.Model = this.VehicleX.Model;
      this.RegistrationNo = this.VehicleX.RegistrationNo;
      this.ManuYr = this.VehicleX.ManuYr;
      this.NoOfSeats =this.VehicleX.NoOfSeats;
      this.OwnersName =this.VehicleX.OwnersName;
      this.OwneresID =this.VehicleX.OwneresID;
      this.OwnersContact =this.VehicleX.OwnersContact;
      this.VehicleInsuaranceNo =this.VehicleX.VehicleInsuaranceNo
      this.RatePerKM =this.VehicleX.RatePerKM;
      this.category =this.VehicleX.category; 
  
  });
  }


  
  getList(){
    const options = {
      filename : this.VehicleNo,
      image: {type: 'jpeg', quality: 1 },
      html2canvas:  { scale : 5},
      margin : 10,
      jsPDF:{ format: 'letter', orientation: 'landscape',putOnlyUsedFonts:true}
    };
    const content: Element = document.getElementById('printable');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }
  }


