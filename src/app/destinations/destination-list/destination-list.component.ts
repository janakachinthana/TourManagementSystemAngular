import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/destination.service';
import { Destination } from 'src/app/shared/destination.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.scss']
})
export class DestinationListComponent implements OnInit {

  constructor(public service : DestinationService, 
    private toastr : ToastrService) { }
    


  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(des : Destination){
    this.service.formData = Object.assign({},des);
  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this record?')){
    this.service.deleteDestination(id).subscribe(res=>{
       this.service.refreshList();
       this.toastr.warning('deleted successfully', 'DES.Register');
    });
  }
  }
}
