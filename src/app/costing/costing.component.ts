import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Guide } from 'src/app/shared/guide.model';
import { DestinationService } from 'src/app/shared/destination.service';
import { Destination } from '../shared/destination.model';
import { EmployeeService } from '../shared/employee.service';



@Component({
  selector: 'app-costing',
  templateUrl: './costing.component.html',
  styleUrls: ['./costing.component.scss']
})
export class CostingComponent implements OnInit {
  UserName : String ;
  selectedDay : string = '';
  selectedDay1 : string = '';
  constructor(public service: GuideService,
    public serviceEmployee: EmployeeService,
    public service1 : DestinationService,
    private toastr : ToastrService
) { }

selectChangeHandler(event: any){

  this.selectedDay = event.target.value;
 
}
selectChangeHandler1(event: any){
  this.selectedDay1 = event.target.value;
}

ngOnInit(): void {
this.service.refreshList(); 
this.service1.refreshList();
this.resetForm();
this.UserName = this.serviceEmployee.UserName.FirstName;
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

populateForm(guide : Guide){
  this.service.formData = Object.assign({},guide);
}

onDelete(id : number){
  if(confirm('Are you sure to delete this record?')){
  this.service1.deleteDestination(id).subscribe(res=>{
     this.service.refreshList();
     this.toastr.warning('deleted successfully', 'DES.Register');
  });
}
}

}