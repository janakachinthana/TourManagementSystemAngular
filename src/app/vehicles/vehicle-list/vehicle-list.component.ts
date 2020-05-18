import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { VehiclesComponent } from '../vehicles.component';
import { VehicleComponent } from '../vehicle/vehicle.component';
import * as html2pdf from 'html2pdf.js'
import * as jsPDF from 'jspdf';
import { VehiclePrintComponent } from '../vehicle-print/vehicle-print.component';




@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
}) 
export class VehicleListComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 100;
  selected: string = 'All';
  searchText: string;


  constructor(
    public service : VehicleService,
    private toastr : ToastrService,
    private dialog:MatDialog ) { }
    ActualPage: number = 1;
    
  ngOnInit() : void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
        this.service.list = [];}
  }

  populateForm(veh : Vehicle){
    this.service.formData = Object.assign({}, veh);
    this.AddOrEditVehicles(veh);
   
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
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    dialogConfig.maxHeight = '100%';
    dialogConfig.height = '100%';
    dialogConfig.data = {veh};
    dialogConfig.scrollStrategy ;
    

    dialogConfig.hasBackdrop;
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

  // onExportClick() {
  //   const options = {
  //     filename : 'Our_awsesome_file_pdf',
  //     image: {type: 'jpeg'},
  //     html2canvas: {},
  //     jsPDF: { orientation : 'Landscape' }
  //   };
  //   const content: Element = document.body;

  //   html2pdf()
  //     .from(content)
  //     .set(options)
  //     .save();
  
  // }

  // @ViewChild('containervehicles') content : ElementRef
  // public downloadPDF(){
  //     let doc= new jsPDF();
  //     let specialElementHandlers={
  //       '#Editor' : function(element,renderer){
  //         return true;
  //       }
  //     };

  //     let content = this.content.nativeElement;
  //     doc.fromHTML(content.innerHTML,15,15,{
  //       'width' : 190,
  //       'elementHandleres' : specialElementHandlers
  //     });

  //     doc.save('test.pdf');
  // }

  getList(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = false;
      // dialogConfig.width = '70%';
      dialogConfig.maxHeight = '100%'
      dialogConfig.scrollStrategy ;
      dialogConfig.height= '100%'
            
      this.dialog.open(VehiclePrintComponent, dialogConfig);
    }
  


    filterItemsOfType(type){
      if(type== 'All'){
          return this.service.list;
      }
      else{
        return this.service.list.filter(x => x.category== type);
      }
  }



    showSelectValue(event : any){
      this.selected = event.target.value;
      
     }

    

}