import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HotelService } from 'src/app/shared/hotel.service';
import { Hotel } from 'src/app/shared/hotel.model';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js'

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

  downloadPDF() {
    const options = {
      filename : 'Employee Report',
      image: {type: 'jpeg', quality: 1 },
      html2canvas:  { scale : 5},
      margin : 10,
      jsPDF:{ format: 'a3', orientation: 'landscape',putOnlyUsedFonts:true}
    };
    const content: Element = document.getElementById('container');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  
  }

}