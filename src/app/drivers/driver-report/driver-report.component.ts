import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DriverService } from 'src/app/shared/driver.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-driver-report',
  templateUrl: './driver-report.component.html',
  styleUrls: ['./driver-report.component.scss']
})
export class DriverReportComponent implements OnInit {
  title = 'ng-pdf';
  selected: string = 'All';

  Male = this.service.list.filter(x => x.Gender=='Male').length;
  Female = this.service.list.filter(x => x.Gender=='Female').length;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Male', String(this.Male)], ['Female', String(this.Female)]];
  public pieChartData: SingleDataSet= [this.Male, this.Female];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
    
  @ViewChild('content')content: ElementRef;

  allDrivers = this.service.list.length;

  constructor(public service : DriverService) { }

  ngOnInit(): void {
    this.service.refreshList();
    if(this.service.list.length == 0)
      this.service.list = [];
  }

  downloadPDF(){
    console.log('Downloading pdf...');
    
    const options = {
      filename: 'Driver_report',
      image: {type: 'jpeg', quality: 1},
      html2canvas: {scale: 5},
      margin : 10,
      jsPDF : {format: 'letter', orientation: 'portrait', putOnlyUsedFonts: true}
    };

    const content: Element = document.getElementById('content');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

  currentDate = new Date();

}
