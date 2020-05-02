import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DestinationService } from 'src/app/shared/destination.service';


@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  constructor(public service : DestinationService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)
     form.resetForm();
    this.service.formData = {
      DestinationID : null,
      DestinationName : '',
      Time : '',
      EntranceFee : null,
      City : '',
      Rules : '',
      Description : ''

    }
  }

  onSubmit(form : NgForm){
    if(form.value.DestinationID == null)
      this.insertRecode(form);
     else
      this.updateRecode(form);
  }

  insertRecode(form : NgForm){
    this.service.postDestination(form.value).subscribe(res =>{
      this.toastr.success('inserted successfully', 'DES.Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecode(form : NgForm){
    this.service.putDestination(form.value).subscribe(res =>{
      this.toastr.info('updated successfully', 'DES.Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
}
