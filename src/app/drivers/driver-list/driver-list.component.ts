import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/shared/driver.service';
import { Driver } from 'src/app/shared/driver.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {

  constructor(public service : DriverService,
    public toastr : ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(d : Driver){
    this.service.formData = Object.assign({},d);
  }
  
  onDelete(id : number){
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteDriver(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted Successfully','Driver Register');
      });
    }
  }

}
