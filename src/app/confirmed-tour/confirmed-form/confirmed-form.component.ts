import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import {  MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { inject } from '@angular/core/testing';
import { HomeServiceService } from 'src/app/shared/home-service.service';
import { Home } from 'src/app/shared/home.model';
import { ConfirmService } from 'src/app/shared/confirm.service';
import { Router } from '@angular/router';
import { ConfirmedService } from 'src/app/shared/confirmed.service';
import { CompletedService } from 'src/app/shared/completed.service';

@Component({
  selector: 'app-confirmed-form',
  templateUrl: './confirmed-form.component.html',
  styleUrls: ['./confirmed-form.component.scss']
})
export class ConfirmedFormComponent implements OnInit {
  formData: Home;
  temp: Home;
  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;


  constructor(public service : ConfirmService,
    private router: Router,
      public CompletedService : CompletedService,
      private toastr : ToastrService,
      @Inject(MAT_DIALOG_DATA) public data,
       public dialogRef: MatDialogRef<ConfirmedFormComponent>
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
       this.temp = Object.assign({}, this.data.Home);
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
        EmployeeFirstName : null,
        EmployeeLastName : null,
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
      EmployeeFirstName : null,
      EmployeeLastName : null,
    }    
  }

  
    onSubmit(form : NgForm){
         
            this.insertRecord(form);

           
        
      // else{
      //   this.updateRecord(form);
      // }
    }

    insertRecord(form : NgForm){
          this.CompletedService.postHome(form.value).subscribe(res =>{
            this.dialogRef.close();
          this.toastr.success('The Package now in  Completed mode', 'Elaphase Vacation',{
          progressBar :true,
      positionClass:'toast-top-right'
          });
          this.service.deleteHome(form.value.homeID).subscribe(res=>{
            this.service.refreshList();
           });
          this.router.navigateByUrl('completed');
          this.resetForm(form);
          this.CompletedService.refreshList();
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