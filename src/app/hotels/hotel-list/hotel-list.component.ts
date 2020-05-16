import { Component, OnInit, HostListener } from '@angular/core';
import { HotelService } from 'src/app/shared/hotel.service';
import { Hotel } from 'src/app/shared/hotel.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { hotelComponent } from '../hotel/hotel.component';

// import { HotelReportComponent } from '../hotel-report/hotel-report.component';

;
import * as jsPDF from 'jspdf';
import { HotelReportComponent } from '../hotel-report/hotel-report.component';






@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 100;

  constructor(public service : HotelService,
    private toastr : ToastrService,
    private dialog:MatDialog 
    // private dialog:MatDialog 
    ) { }

  ngOnInit(): void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
        this.service.list = [];} 
  }
  downloadPDFBtn(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    this.dialog.open(HotelReportComponent, dialogConfig);
  }

  AddOrEditHotels(hotel: Hotel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.height = '94%';
    dialogConfig.data = {hotel};
    this.dialog.open(hotelComponent, dialogConfig);
  }
  


  populateForm( htl : Hotel){
    this.service.formData = Object.assign({},htl);
  }

  onDelete(id : number){
    if(confirm('Do you want to Delete this Record...?')){
    this.service.deleteHotel(id).subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'HTL. Register');
      this.toastr.warning('Deleted successfully', ' Elephas vacations',{
        progressBar :true,
        positionClass:'toast-top-right',
        easing:'ease-in'
      });
    });
  }
  }

  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
 
    this.dialog.open(hotelComponent)
  }

  // genarateReport(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.disableClose = false;
  //   // dialogConfig.width = '70%';
  //   dialogConfig.maxHeight = '100%'
  //   dialogConfig.scrollStrategy ;
  //   dialogConfig.height= '100%'
  //   this.dialog.open(HotelReportComponent, dialogConfig);
  // }


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
