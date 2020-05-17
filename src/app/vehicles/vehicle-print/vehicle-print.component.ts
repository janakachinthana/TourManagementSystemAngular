import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js'
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { CommonModule, NgIf } from "@angular/common";






@Component({
  selector: 'app-vehicle-print',
  templateUrl: './vehicle-print.component.html',
  styleUrls: ['./vehicle-print.component.scss']
})
export class VehiclePrintComponent implements OnInit {
  selected: string = 'All';
 
  counterCar = this.service.list.filter(x => x.category== 'car').length;
  counterVan = this.service.list.filter(x => x.category== 'van').length;
  counterBus = this.service.list.filter(x => x.category== 'bus').length;
  counterSUV = this.service.list.filter(x => x.category== 'suv').length;
  counterAll = this.counterCar+ this.counterVan + this.counterSUV + this.counterBus;

  Toyota = this.service.list.filter(x => x.Brand== 'Toyota').length;
  Nissan = this.service.list.filter(x => x.Brand== 'Nissan').length;
  Mercedeze = this.service.list.filter(x => x.Brand== 'Mercedeze').length;
  Landrover = this.service.list.filter(x => x.Brand== 'Land rover').length;
  BMW = this.service.list.filter(x => x.Brand== 'BMW').length;
  Tata = this.service.list.filter(x => x.Brand== 'Tata').length;
  Leyland = this.service.list.filter(x => x.Brand== 'Leyland').length;
  Daihatsu = this.service.list.filter(x => x.Brand== 'Daihatsu').length;
  Suzuki = this.service.list.filter(x => x.Brand== 'Suzuki').length;
  Honda = this.service.list.filter(x => x.Brand== 'Honda').length;
  Fiat = this.service.list.filter(x => x.Brand== 'Fiat').length;
  Isuzu = this.service.list.filter(x => x.Brand== 'Isuzu').length;
  Other = this.service.list.filter(x => x.Brand== 'Other').length;



  title = 'Number of vehicle types Registered in Elephas';
  title2 = 'Percentages of vehicle tpyes Registered in Elephas';
  title3 = 'Number of vehicle Brands Registered in Elephas';

   type = 'PieChart';
   type2 = 'ColumnChart';
   data2 = [
    ['Toyota', this.Toyota ],
    ['Nissan', this.Nissan],
    ['Mercedeze', this.Mercedeze],
    ['Landrover',this.Landrover],
    ['BMW',this.BMW],
    ['Tata',this.Tata],
    ['Leyland',this.Leyland],
    ['Daihatsu',this.Daihatsu],
    ['Suzuki',this.Suzuki],
    ['Honda',this.Honda],
    ['Fiat',this.Fiat],
    ['Isuzu',this.Isuzu],
    // ['Other',this.Other],
   ];

   data = [
    ['Cars', this.counterCar ],
    ['Vans', this.counterVan],
    ['Buses', this.counterBus],
    ['SUV',this.counterSUV],
   ];

   columnNames = ['Vehiclel', 'Percentage'];
   options = {    
   };
   width = 550;
   width2 = 550;
   height = 400;
   height2 = 300;

  constructor(public service : VehicleService,
    ) { }

  ngOnInit(): void {
    this.service.refreshList();
 
      }
  

  onExportClick() {
    const options = {
      filename : 'Vehicle_report_Eliphas',
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
  onExportClickTable() {
    const options = {
      filename : 'Vehicle-list-Elephas',
      image: {type: 'jpeg', quality: 1 },
      html2canvas:  { scale : 5},
      margin : 10,
      jsPDF:{ format: 'letter', orientation: 'landscape',putOnlyUsedFonts:true}
    };
    const content: Element = document.getElementById('onlytable');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  
  }


  onExportClickGraph(){
    const options = {
      filename : 'Graphs-Vehicle-Report',
      image: {type: 'jpeg', quality: 1 },
      html2canvas:  { scale : 5},
      margin : 10,
      jsPDF:{ format: 'letter', orientation: 'landscape',putOnlyUsedFonts:true}
    };
    const content: Element = document.getElementById('printgraph');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }
  currentDate = new Date();


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
