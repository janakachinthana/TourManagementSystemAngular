import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material/dialog";
import * as jsPDF from 'jspdf';
import { HomeServiceService } from 'src/app/shared/home-service.service';
import { Home } from 'src/app/shared/home.model';
import { EstimatedToursFormComponent } from '../estimated-tours-form/estimated-tours-form.component';


@Component({
  selector: 'app-estimated-tours-list',
  templateUrl: './estimated-tours-list.component.html',
  styleUrls: ['./estimated-tours-list.component.scss']
})
export class EstimatedToursListComponent implements OnInit {
  UserName : String ;
  
  isShow: boolean;
  topPosToStartShowing = 100;
  
  constructor(
    public service : HomeServiceService,
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

  // downloadPDFBtn(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.disableClose = false;
  //   dialogConfig.width = '80%';
  //   dialogConfig.height = '90%';
  //   this.dialog.open(EmployeesReportComponent, dialogConfig);
  // }

  populateForm(home : Home){
    this.service.formData = Object.assign({}, home);
    this.AddOrEditEmployees(home);

   
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Employee record?')){
    this.service.deleteHome(id).subscribe(res=>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', ' Elephas vacations',{
        progressBar :true,
        positionClass:'toast-top-right',
        easing:'ease-in'
      });    });
  }
}

  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
 
    // this.dialog.open(EmployeeRegisterComponent)
  }
  AddOrEditEmployees(home: Home) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '25%';
    dialogConfig.height = '94%';
    // dialogConfig.data = {home};
    this.dialog.open(EstimatedToursFormComponent, dialogConfig);
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