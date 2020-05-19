import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EmployeeRegisterComponent } from '../employee-register/employee-register.component';
import * as jsPDF from 'jspdf';
import { EmployeesReportComponent } from '../employees-report/employees-report.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  UserName : String ;
  searchText: string;
  isShow: boolean;
  topPosToStartShowing = 100;
  pageActual: number = 1;

  constructor(
    public service : EmployeeService,
    private toastr : ToastrService,
    private dialog:MatDialog ) { }

  ngOnInit() : void {
    this.service.refreshList();
      if (this.service.list.length == 0) {
          this.service.list = [];}
  }

  @ViewChild('content')content: ElementRef;
  
  public downloadPDF(){
    let doc =new jsPDF();
    let specialElimentHandlers = {
      '#editor': function(element: any, renderer: any){
        return true;
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15,15, {
      'width': 190,
      'elementHandlers': specialElimentHandlers

    });
    doc.save('test.pdf');

  }

  downloadPDFBtn(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    this.dialog.open(EmployeesReportComponent, dialogConfig);
  }

  populateForm(emp : Employee){
    this.service.formData = Object.assign({}, emp);
    this.AddOrEditEmployees(emp); 
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Employee record?')){
      this.service.deleteEmployee(id).subscribe(res=>{
        this.service.refreshList();
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
    this.dialog.open(EmployeeRegisterComponent)
  }

  AddOrEditEmployees(emp: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '35%';
    dialogConfig.height = '80%';
    dialogConfig.data = {emp};
    this.dialog.open(EmployeeRegisterComponent, dialogConfig);
  }
  
  @HostListener('window:scroll')
  checkScroll() { 
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