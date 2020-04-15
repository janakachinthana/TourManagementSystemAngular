import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  constructor(public service: GuideService,
    private toastr : ToastrService) { }

      imageUrl: string = "/assets/img/guide.jpg";
      fileToUpload: File = null;

 
      handleFileInput(file: FileList) {
      this.fileToUpload = file.item(0);

        //Show image preview
      var reader = new FileReader();
      reader.onload = (event:any) => {
      this.imageUrl = event.target.result;

      }
        reader.readAsDataURL(this.fileToUpload);
      }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();
    this.service.formData ={ 
      GuideID : null,
      FirstName : '',
      LastName : '',
      Address : '',
      BirthDay : '',
      NicNo : '',
      Email : '',
      ContactNo : null,
      Gender :'',
      Languages : '',
      Price  : null,
      Image : null,
    }    
    this.imageUrl = "/assets/img/guide.jpg"
  } 


  onSubmit(form : NgForm){
    if(form.value.GuideID == null )
    {
      
      if(form.value.FirstName == '' || form.value.LastName == '' ||form.value.Address == '' || form.value.BirthDay == '' || form.value.NicNo == '' || form.value.Email == ''|| form.value.ContactNo == '' || form.value.Gender == '' || form.value.Languages == '' || form.value.Price == '')
      {
      this.toastr.warning('Insert faild', 'Eliphase');
      }
      else
      {
        this.insertRecord(form);
      }
    }
      
    else{
      if(form.value.FirstName !=null || form.value.LastName !=null ||form.value.Address !=null || form.value.BirthDay !=null || form.value.NicNo !=null || form.value.Email !=null|| form.value.ContactNo !=null || form.value.Gender !=null || form.value.Languages !=null || form.value.Price !=null)
      this.updateRecord(form);
      else
      this.toastr.warning('Update faild', 'Eliphase');
    }
  }

  insertRecord(form : NgForm){
    this.service.postGuide(form.value).subscribe(res =>{
    this.toastr.success('Insert successfully', 'Eliphase');
    this.resetForm(form);
    this.service.refreshList();
    });

}

updateRecord(form : NgForm){
  this.service.putGuide(form.value).subscribe(res =>{
    this.toastr.info('Updated successfully', 'Eliphase');
    this.resetForm(form);
    this.service.refreshList();
  });
}
  
}