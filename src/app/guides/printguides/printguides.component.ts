import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import * as html2pdf from 'html2pdf.js'


@Component({
  selector: 'app-printguides',
  templateUrl: './printguides.component.html',
  styleUrls: ['./printguides.component.scss']
})
export class PrintguidesComponent implements OnInit {

  constructor(public service : GuideService,
    ) { }

  ngOnInit(): void {
    this.service.refreshList();
  }



  onExportClick() {
    const options = {
      filename : 'Guide Report',
      image: {type: 'jpeg', quality: 1 },
      html2canvas:  { scale : 5},
      margin : 10,
      jsPDF:{ format: 'letter', orientation: 'landscape',putOnlyUsedFonts:true}
    };
    const content: Element = document.getElementById('container');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  
  }
}
