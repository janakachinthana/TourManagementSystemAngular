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

    ngOnInit() {
      this.service.refreshList(); 
    }


    populateForm(dest : Destination){
      this.service.formData = Object.assign({},dest);
    }
  
    onDelete(id : number){
      if(confirm('Do you want to Delete this Record...?')){
      this.service.deleteDestination(id).subscribe(res =>{
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Destination');
      })
    }
    }
  
}


 