import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/shared/hotel.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})

export class hotelComponent implements OnInit {
  
  imageUrl: string = "/assets/img/img.jpg";
  fileToUpload: File = null;
  
  constructor(public service: HotelService,private toastr : ToastrService) { }


 
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
        
        if(form.value.HotelName == '' || form.value.Address == '' || form.value.PhoneNumber == '' || form.value.Email == '' || form.value.StarClass == '' || form.value.Single== '' || form.value.Double== ''|| form.value.Triple== '' || form.value.Quard== '' || form.value.King== '' || form.value.Queen== ''|| form.value.RoomOnly== '' || form.value.BedAndBreackfast== '' || form.value.FullBoard== '' || form.value.HalfBoard== '')
        {
        this.toastr.warning('Insert faild', 'HTL. Register');
        }
        else
        {
          this.insertRecord(form);
        }
      }
        
      else{
        if(form.value.HotelName != null &&  form.value.Address != null && form.value.PhoneNumber != null && form.value.Email != null && form.value.StarClass != null && form.value.Single != null && form.value.Double != null  && form.value.Triple != null && form.value.Quard != null && form.value.King != null && form.value.Queen != null && form.value.RoomOnly != null && form.value.BedAndBreackfast != null && form.value.FullBoard != null && form.value.HalfBoard != null)
        this.updateRecord(form);
        else
        this.toastr.warning('Update faild', 'HTL. Register');
      }
    }

    insertRecord(form : NgForm){
          this.service.postHotel(form.value).subscribe(res =>{
          this.toastr.success('Insert successfully', 'HTL. Register');
          this.resetForm(form);
          this.service.refreshList();
          });

    }

    updateRecord(form : NgForm){
      this.service.putHotel(form.value).subscribe(res =>{
        this.toastr.info('Updated successfully', 'HTL. Register');
        this.resetForm(form);
        this.service.refreshList();
      });
    }




}