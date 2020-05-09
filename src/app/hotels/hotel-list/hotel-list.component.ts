import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/shared/hotel.service';
import { Hotel } from 'src/app/shared/hotel.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {

  constructor(public service : HotelService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList(); 
  }

  populateForm( htl : Hotel){
    this.service.formData = Object.assign({},htl);
  }

  onDelete(id : number){
    if(confirm('Do you want to Delete this Record...?')){
    this.service.deleteHotel(id).subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'HTL. Register');
    })
  }
  }

}
