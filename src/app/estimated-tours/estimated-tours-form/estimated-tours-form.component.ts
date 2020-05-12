import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import {  MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { inject } from '@angular/core/testing';
import { HomeServiceService } from 'src/app/shared/home-service.service';
import { Home } from 'src/app/shared/home.model';

@Component({
  selector: 'app-estimated-tours-form',
  templateUrl: './estimated-tours-form.component.html',
  styleUrls: ['./estimated-tours-form.component.scss']
})
export class EstimatedToursFormComponent implements OnInit {
  formData: Home;
  temp: Home;
  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;


  constructor(public service : HomeServiceService,
      private toastr : ToastrService,
      @Inject(MAT_DIALOG_DATA) public data,
       public dialogRef: MatDialogRef<EstimatedToursFormComponent>
    ) { }
   

 handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);

  //Show image preview
  var reader = new FileReader();
  reader.onload = (event:any) => {
    this.imageUrl = event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload);
}
 
ngOnInit() :void{
    
  if (this.data.Home == null) {
     this.resetForm();
    } else {

      // fill all the field with related data in the pop-up
       this.temp = Object.assign({}, this.data.emp);
       this.service.formData ={ 
        homeID: null, 
        customerName: null,
        TotalExpenses: null,
        CompanyPresentage: null,
        AgentProfitPrasentage: null,
        comanyProfit: null,
        AgentProfit: null,
        numberOfAdult: null,
        numberOfChild: null,
        OverollCost: null,
    };
    }
}

  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();
    this.service.formData ={ 
      homeID: null, 
      customerName: '',
      TotalExpenses: null,
      CompanyPresentage: null,
      AgentProfitPrasentage: null,
      comanyProfit: null,
      AgentProfit: null,
      numberOfAdult: null,
      numberOfChild: null,
      OverollCost: null,
    }    
  }

  
    onSubmit(form : NgForm){
      if(form.value.homeID == null )
      {     
            this.insertRecord(form);
      }
        
      else{
        this.updateRecord(form);
      }
    }

    insertRecord(form : NgForm){
          this.service.postHome(form.value).subscribe(res =>{
            this.dialogRef.close();
          this.toastr.success('Employee Added successfully', 'Elaphase Vacation',{
          progressBar :true,
      positionClass:'toast-top-right'
          });
          this.resetForm(form);
          this.service.refreshList();
          });

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

    updateRecord(form : NgForm){
      if (confirm('Are you sure want to Update this Employee record?')){
      this.service.putHome(form.value).subscribe(res =>{
        this.toastr.info('Updated successfully', 'EMP. Register',{
          progressBar :true,
          positionClass:'toast-top-right',
          easing:'ease-in'
        });
        this.resetForm(form);
        this.service.refreshList();
        this.dialogRef.close();
      });
    }
  }


}