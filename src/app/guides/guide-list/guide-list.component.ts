import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import { Guide } from 'src/app/shared/guide.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.scss']
})
export class GuideListComponent implements OnInit {

  constructor(public service : GuideService,
    private toastr : ToastrService) { }


  ngOnInit(): void {
    this.service.refreshList(); 
  }

  populateForm(guide : Guide){
    this.service.formData = Object.assign({},guide);
  }

  onDelete(id : number){
    if(confirm('Do you want to Delete this Record...?')){
    this.service.deleteGuide(id).subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'Eliphase');
    })
  }
  }

}
  

 


