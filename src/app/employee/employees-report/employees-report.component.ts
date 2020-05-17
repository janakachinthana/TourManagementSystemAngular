import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EmployeeRegisterComponent } from '../employee-register/employee-register.component';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-employees-report',
  templateUrl: './employees-report.component.html',
  styleUrls: ['./employees-report.component.scss']
})
export class EmployeesReportComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 100;
  
  constructor(
    public service : EmployeeService,
    private toastr : ToastrService,
    private dialog:MatDialog ) { }

  ngOnInit() : void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
        this.service.list = [];}
  }

  downloadPDF() {
    const options = {
      filename : 'Employee Report',
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

  populateForm(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.height = '94%';
    this.dialog.open(EmployeesReportComponent);

   
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Employee record?')){
    this.service.deleteEmployee(id).subscribe(res=>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', ' Elephas vacations',{
        progressBar :true,
        positionClass:'toast-top-right',
        easing:'ease-in'
      });    });
  }}

  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
 
    this.dialog.open(EmployeeRegisterComponent)
  }
  AddOrEditEmployees(emp: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.height = '94%';
    dialogConfig.data = {emp};
    this.dialog.open(EmployeeRegisterComponent, dialogConfig);
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

}