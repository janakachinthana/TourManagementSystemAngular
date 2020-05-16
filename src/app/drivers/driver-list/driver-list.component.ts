import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DriverService } from 'src/app/shared/driver.service';
import { Driver } from 'src/app/shared/driver.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DriverComponent } from '../driver/driver.component';
import { DriverReportComponent } from '../driver-report/driver-report.component'
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {
  title = 'ng-pdf';
  searchText: string;
  @ViewChild('content')content: ElementRef;

  constructor(public service : DriverService,
    public toastr : ToastrService,
    private dialog: MatDialog) { }

    pageActual: number = 1;

  ngOnInit(): void {
    this.service.refreshList();
    if(this.service.list.length == 0)
      this.service.list = [];
  }

  populateForm(d : Driver){
    this.service.formData = Object.assign({},d);
    this.AddOrEditDriver(d);
  }
  
  onDelete(id : number){
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteDriver(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted Successfully','Driver Register');
      });
    }
  }

  AddOrEditDriver(d: Driver){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%"
    dialogConfig.data = {d}
    this.dialog.open(DriverComponent, dialogConfig);
  }

  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(DriverComponent);
  }

  generateDriverReport(d: Driver){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {d}
    this.dialog.open(DriverReportComponent);
  }
}
