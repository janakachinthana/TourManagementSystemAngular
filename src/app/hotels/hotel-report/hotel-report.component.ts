import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HotelService } from 'src/app/shared/hotel.service';
import { Hotel } from 'src/app/shared/hotel.model';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-hotel-report',
  templateUrl: './hotel-report.component.html',
  styleUrls: ['./hotel-report.component.scss']
})
export class HotelReportComponent implements OnInit {

  constructor(public service : HotelService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList(); 
  }

  populateForm( htl : Hotel){
    this.service.formData = Object.assign({},htl);
  }

  onDelete(id : number){
    if(confirm('Do you want to Delete this Record...?')){
    this.service.deleteHotel(id).subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'HTL. Register');
    })
  }
  }

  @ViewChild('content')content: ElementRef;
  
  public downloadPDF(){

    let doc =new jsPDF('landscape', 'px', 'ledger') ;

    let specialElimentHandlers = {

      '#editor': function(element: any, renderer: any){
        return true;
      }

    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15,15,{

      'width': 590,
      'elementHandlers': specialElimentHandlers

    });

    doc.save('Employee Details (Eliphase Vacation).pdf');

  }

}
