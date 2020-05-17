import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/destination.service';
import * as html2pdf from 'html2pdf.js'
import { CommonModule, NgIf } from "@angular/common";


@Component({
  selector: 'app-des-print',
  templateUrl: './des-print.component.html',
  styleUrls: ['./des-print.component.scss']
})
export class DesPrintComponent implements OnInit {

  constructor(public service : DestinationService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }


  downPDF(){
      const options = {
        filename : 'Destination_report',
        image: {type: 'jpeg', quality: 1 },
        html2canvas:  { scale : 5},
        margin : 10,
        jsPDF:{ format: 'letter', orientation: 'landscape',putOnlyUsedFonts:true}
      };
      const content: Element = document.getElementById('content');
  
      html2pdf()
        .from(content)
        .set(options)
        .save();
    
    }
  
}
