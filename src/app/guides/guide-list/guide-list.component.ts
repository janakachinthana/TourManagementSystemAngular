import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import { Guide } from 'src/app/shared/guide.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { PrintguidesComponent } from '../printguides/printguides.component';
import * as jsPDF from 'jspdf';
import { GuideComponent } from '../guide/guide.component';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.scss']
})
export class GuideListComponent implements OnInit {

  UserName : String ;
  
  isShow: boolean;
  topPosToStartShowing = 100;
  
  constructor(
    public service : GuideService,
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
    this.dialog.open(PrintguidesComponent, dialogConfig);
  }

  populateForm(guide : Guide){
    this.service.formData = Object.assign({}, guide);
    this.AddOrEditGuide(guide);

   
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Guide record?')){
    this.service.deleteGuide(id).subscribe(res=>{
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
 
    this.dialog.open(GuideComponent)
  }
  AddOrEditGuide(guide: Guide) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.height = '94%';
    dialogConfig.data = {guide};
    this.dialog.open(GuideComponent, dialogConfig);
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