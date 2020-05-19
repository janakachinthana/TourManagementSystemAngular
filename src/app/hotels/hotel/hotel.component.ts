import { Component, OnInit, Inject } from '@angular/core';
import { HotelService } from 'src/app/shared/hotel.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hotel } from 'src/app/shared/hotel.model';



@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})

export class hotelComponent implements OnInit {
  formData: Hotel;
  temp: Hotel;

  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;
  
  constructor(public service: HotelService,
    private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<hotelComponent>) { }


 
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
  if (this.data.hotel == null) {
    this.resetForm();
   } else {

     // fill all the field with related data in the pop-up
    this.temp = Object.assign({}, this.data.hotel);
    this.service.formData = {
      
      HotelID : this.temp.HotelID,
      HotelName : this.temp.HotelName,
      Address : this.temp.Address,
      PhoneNumber: this.temp.PhoneNumber,
      Email : this.temp.Email,
      StarClass : this.temp.StarClass,
      Single: this.temp.Single,
      Double: this.temp.Double,
      Triple: this.temp.Triple,
      Quard: this.temp.Quard,
      King: this.temp.King,
      Queen: this.temp.Queen,
      RoomOnly : this.temp.RoomOnly,
      BedAndBreackfast: this.temp.BedAndBreackfast,
      FullBoard : this.temp.FullBoard, 
      HalfBoard : this.temp.HalfBoard,
      Image : this.temp.Image,
     };
   }
}

  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();
    this.service.formData ={ 
      HotelID : null,
      HotelName :'',
      Address : '',
      PhoneNumber: null,
      Email : '',
      StarClass : null,
      Single: null,
      Double: null,
      Triple: null,
      Quard: null,
      King: null,
      Queen:null,
      RoomOnly : null,
      BedAndBreackfast: null,
      FullBoard : null, 
      HalfBoard : null,
      Image : null,
    }    
    this.imageUrl = "/assets/img/img.jpg"
  }

  
    onSubmit(form : NgForm){
      if(form.value.HotelID == null )
      {
        
        if(form.value.HotelName == '' || form.value.Address == '' || form.value.PhoneNumber == '' || form.value.Email == '' || form.value.StarClass == null || form.value.Single== null || form.value.Double== null|| form.value.Triple== null || form.value.Quard== null || form.value.King== null || form.value.Queen== null|| form.value.RoomOnly== null || form.value.BedAndBreackfast== null || form.value.FullBoard== null || form.value.HalfBoard== null)
        {
        this.toastr.warning('Insert faild', 'HTL. Register');
        }
        else
        {
          this.insertRecord(form);
        }
      }
        
      else{
        if(form.value.HotelName == '' ||  form.value.Address == '' || form.value.PhoneNumber == null || form.value.Email == '' || form.value.StarClass == null || form.value.Single == null || form.value.Double == null  || form.value.Triple == null || form.value.Quard == null || form.value.King == null || form.value.Queen == null || form.value.RoomOnly == null || form.value.BedAndBreackfast == null || form.value.FullBoard == null || form.value.HalfBoard == null)
        {
        this.toastr.warning('Update faild', 'HTL. Register');
        }else
        {
        this.updateRecord(form);
        }
      }
    }

    insertRecord(form : NgForm){
          this.service.postHotel(form.value).subscribe(res =>{
          this.toastr.success('Insert successfully', 'HTL. Register');
          this.resetForm(form);
          this.service.refreshList();
          this.dialogRef.close();
          });

    }

    updateRecord(form : NgForm){
      this.service.putHotel(form.value).subscribe(res =>{
        this.toastr.info('Updated successfully', 'HTL. Register');
        this.resetForm(form);
        this.service.refreshList();
        this.dialogRef.close();
      });
    }


    demo(){
      this.service.formData.HotelName = "Deshani";
      this.service.formData.Address = "Balapitiya, Mathara";
      this.service.formData.PhoneNumber = 779882552;
      this.service.formData.Email = "deshanihotel@gmail.com";
      this.service.formData.StarClass = 2;
      this.service.formData.Single = 2500;
      this.service.formData.Double = 3000;
      this.service.formData.Triple = 3500; 
      this.service.formData.Quard = 4000;
      this.service.formData.King = 4500;
      this.service.formData.Queen = 5000;
      this.service.formData.RoomOnly = 100;
      this.service.formData.BedAndBreackfast = 1000;
      this.service.formData.FullBoard = 3000; 
      this.service.formData.HalfBoard = 2000;
      
    }

}