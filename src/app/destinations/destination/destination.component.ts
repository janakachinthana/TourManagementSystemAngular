import { Component, OnInit, Inject } from '@angular/core';
import { DestinationService } from 'src/app/shared/destination.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destination } from 'src/app/shared/destination.model';


@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  formData: Destination;
  temp: Destination;

  constructor(public service : DestinationService,
    private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DestinationComponent>
    ) { }

  ngOnInit(): void {
    if (this.data.des == null) {
      this.resetForm();
     } else {
       // fill all the field with related data in the pop-up
        this.temp = Object.assign({}, this.data.des);
        this.service.formData = {
          DestinationID : this.temp.DestinationID,
          DestinationName : this.temp.DestinationName,
          Time : this.temp.Time,
          EntranceFee : this.temp.EntranceFee,
          CityOfTheDestination : this.temp.CityOfTheDestination,
          RulesAndRegulations : this.temp.RulesAndRegulations,
          DescriptionOfThePlace : this.temp.DescriptionOfThePlace,
          EntranceFeeChild : this.temp.EntranceFeeChild,
          Attraction : this.temp.Attraction,
          Activities : this.temp.Activities,
          Village:this.temp.Village
     
       };
     }
  }

  resetForm(form? : NgForm){
    if(form != null)
     form.resetForm();
    this.service.formData = {
      DestinationID : null,
      DestinationName : '',
      Time : '',
      EntranceFee : null,
      CityOfTheDestination : '',
      RulesAndRegulations : '',
      DescriptionOfThePlace : '',
      EntranceFeeChild: null,
      Attraction : '',
      Activities : '',
      Village:''
 
    };
  }

  onSubmit(form : NgForm){
    if(form.value.DestinationID == null)
      this.insertRecode(form);
     else
      this.updateRecode(form);
  }

  insertRecode(form : NgForm){
    this.service.postDestination(form.value).subscribe(res =>{
      this.toastr.success('Destiination inserted successfully', 'Elephas vacations');
      this.resetForm(form);
      this.service.refreshList();
      this.dialogRef.close();

    });
  }

  updateRecode(form : NgForm){
    this.service.putDestination(form.value).subscribe(res =>{
      this.toastr.info('Destination updated successfully', 'Elephas vacation');
      this.resetForm(form);
      this.service.refreshList();
      this.dialogRef.close();

    });
  }
  AutoFill(){
    this.service.formData = {
      DestinationID : null,
      DestinationName : "One Galle Face",
      Time : "3 hours",
      EntranceFee : 0,
      EntranceFeeChild: 0,
      CityOfTheDestination : "Colombo",
      RulesAndRegulations : "No",
      DescriptionOfThePlace : "A number one shopping mall in Sri Lanka",
      Attraction : "Modern shopping complex",
      Activities : "Shopping, dine-in, Theaters, games",
      Village:"Galle-face"
 
    };
  }                    
}
