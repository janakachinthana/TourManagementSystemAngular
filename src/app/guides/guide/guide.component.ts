import { Component, OnInit, Inject } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Guide } from 'src/app/shared/guide.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  formData: Guide;
  temp: Guide;
  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;


  constructor(public service : GuideService,
      private toastr : ToastrService,
      @Inject(MAT_DIALOG_DATA) public data,
       public dialogRef: MatDialogRef<GuideComponent>
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
    
  if (this.data.guide == null) {
     this.resetForm();
    } else {

      // fill all the field with related data in the pop-up
       this.temp = Object.assign({}, this.data.guide);
       this.service.formData = {
        GuideID : this.temp.GuideID,
        FirstName : this.temp.FirstName,
        LastName : this.temp.LastName,
        Address : this.temp.Address,
        BirthDay : this.temp.BirthDay,
        NicNo : this.temp.NicNo,
        Email  : this.temp.Email,
        ContactNo : this.temp.ContactNo,
        Gender : this.temp.Gender,
        Languages : this.temp.Languages,
        Price  : this.temp.Price,
        Image : this.temp.Image
      };
    }
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
      Email  : '',
      ContactNo : null,
      Gender : '',
      Languages : '',
      Price  : null,
      Image : ''
    }    
    this.imageUrl = "/assets/img/img.jpg"
  
  }

  
    onSubmit(form : NgForm){
      if(form.value.GuideID == null )
      {
        
        if(form.value.FirstName == '' || form.value.LastName == '' || form.value.Languages == ''|| form.value.Gender == '' ||form.value.Address == '' || form.value.BirthDay == '' || form.value.NicNo == '' || form.value.ContactNo == '' || form.value.Email == '')
        {
        this.toastr.warning('Insert faild', 'Elephas Vacation');
        }
        else
        {
          if (form.value.BirthDay > "2005-01-01" || form.value.BirthDay < "1943-01-01") {
            this.toastr.warning('Your Birth Day should be less than "2005-01-01" and grater than "1943-01-01" ', 'Eliphase Vacation');
          }
          else{
            this.insertRecord(form);
          }
        
        }
      }
        
      else{
        if(form.value.FillName != null || form.value.LastName != null || form.value.Languages || null && form.value.Gender != null || form.value.Address != null || form.value.BirthDay != null || form.value.NicNo != null || form.value.ContactNo != null || form.value.Email != null )
        this.updateRecord(form);
        else
        this.toastr.warning('Update faild', 'Elephas Vacation');
      }
    }

    insertRecord(form : NgForm){
          this.service.postGuide(form.value).subscribe(res =>{
            this.dialogRef.close();
          this.toastr.success('Guide Added successfully', 'Elephas Vacation',{
          progressBar :true,
      positionClass:'toast-top-right'
          });
          this.resetForm(form);
          this.service.refreshList();
          });

    }

    updateRecord(form : NgForm){
      if (confirm('Are you sure want to Update this Guide record?')){
      this.service.putGuide(form.value).subscribe(res =>{
        this.toastr.info('Updated successfully', 'Elephas Vacation',{
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

    demo(){
      this.service.formData.FirstName = "Jorge"; 
      this.service.formData.LastName = "Perea"; 
      this.service.formData.Address = "No87, Colombo 7"; 
      this.service.formData.ContactNo = 119876543; 
      this.service.formData.Email = "kusalperera@gmail.com"; 
      this.service.formData.NicNo = "851421719V"; 
      this.service.formData.BirthDay = "1985-02-02";
      this.service.formData.Gender = "Male";
      this.service.formData.Languages = "English, Franch";  
      this.service.formData.Price = 2500 
    }

}