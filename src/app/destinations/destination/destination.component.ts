import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/destination.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  imageUrl: string = "/assets/img/imgDestination.jpg";
  fileToUpload: File = null;
  constructor(public service: DestinationService,
   
    private toastr : ToastrService) { }

    handleFileInput(file: FileList) {
      this.fileToUpload = file.item(0);
    
      //Show image preview
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
    }

    ngOnInit() {
      this.resetForm();
    
    }

    resetForm(form? : NgForm){
      if(form != null)
      form.resetForm();
      this.service.formData ={ 
        DestinationID : null,
        DestinationName : '',
        Time: '',
        EntranceFee: null,
        City: '',
        Rules: '',
        Description: '',
        Image: '',
      }    
      this.imageUrl = "/assets/img/imgDestination.jpg"
    }

    onSubmit(form : NgForm){
      if(form.value.DestinationID == null )
      {
        
        if(form.value.DestinationName == '' || form.value.Time == '' ||form.value.EntranceFee == '' || form.value.City == '' || form.value.Rules == '' || form.value.Description == '' ||  form.value.Image == '')
        {
        this.toastr.warning('Insert faild', 'Destination');
        }
        else
        {
          this.insertRecord(form);
        }
      }
        
      else{
        if(form.value.DestinationName != null || form.value.Time != null || form.value.EntranceFee || null && form.value.City != null || form.value.Rules != null || form.value.Description != null)
        this.updateRecord(form);
        else
        this.toastr.warning('Update faild', 'Destination');
      }
    }

    insertRecord(form : NgForm){
      this.service.postDestination(form.value).subscribe(res =>{
      this.toastr.success('Insert successfully', 'Destination');
      this.resetForm(form);
      this.service.refreshList();
      });

}

updateRecord(form : NgForm){
  this.service.putDestination(form.value).subscribe(res =>{
    this.toastr.info('Updated successfully', 'Destination');
    this.resetForm(form);
    this.service.refreshList();
  });
}

}