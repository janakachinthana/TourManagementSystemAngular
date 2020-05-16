import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import { Guide } from 'src/app/shared/guide.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { PrintguidesComponent } from '../printguides/printguides.component';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.scss']
})
export class GuideListComponent implements OnInit {

  constructor(public service : GuideService,
    private toastr : ToastrService,
    public dialog:MatDialog ) { }


  ngOnInit(): void {
    this.service.refreshList(); 
  }

  populateForm(guide : Guide){
    this.service.formData = Object.assign({},guide);
  }

  onDelete(id : number){
    if(confirm('Do you want to Delete this Record...?')){
    this.service.deleteGuide(id).subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'Eliphase');
    })
  }
  }

  report(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    // dialogConfig.width = '70%';
    dialogConfig.maxHeight = '100%'
    dialogConfig.scrollStrategy ;
    this.dialog.open(PrintguidesComponent, dialogConfig);
  }


}
  

 


