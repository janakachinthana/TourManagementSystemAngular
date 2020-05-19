import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-employee-sigle-report',
  templateUrl: './employee-sigle-report.component.html',
  styleUrls: ['./employee-sigle-report.component.scss']
})
export class EmployeeSigleReportComponent implements OnInit {

  constructor(public service : EmployeeService) { }

  ngOnInit(): void {
  }

  
  downloadPDF() {
    const options = {
      filename : '( '+this.service.formData.FirstName + ') Employee Report',
      image: {type: 'jpeg', quality: 1 },
      html2canvas:  { scale : 5},
      margin : 10,
      jsPDF:{ format: 'a4', orientation: 'portrait',putOnlyUsedFonts:true}
    };
    const content: Element = document.getElementById('container');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  
  }


}
