import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(public service : EmployeeService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.service.refreshList(); 
  }

  populateForm(emp : Employee){
    this.service.formData = Object.assign({},emp);
  }

  onDelete(id : number){
    if(confirm('Do you want to Delete this Record...?')){
    this.service.deleteEmployee(id).subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'EMP. Register');
    })
  }
  }

}
