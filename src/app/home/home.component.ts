import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Guide } from 'src/app/shared/guide.model';
import { DestinationService } from 'src/app/shared/destination.service';
import { Destination } from '../shared/destination.model';
import { CustomerService } from '../shared/customer.service';
import { VehicleService } from '../shared/vehicle.service';
import { DriverService } from '../shared/driver.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public guidePrice : number = null;
  public TotalDAndGPrice : number = null;
  public selectedDay2 : number = null;
  public numberOfPeople : number = null;

  public grossMilage : number;
  public extraMilage : number;
  public chargePerKm : number;
  public totalTransportCost : number;

  public numberOfSeats : number; 
  public driverFee : number;
  public rate : number; 

  constructor(public service: GuideService,
              public service1 : DestinationService,
              public service2: CustomerService,
              public service3: VehicleService,
              public service4: DriverService,
              private toastr : ToastrService
) { }

public GuideX : any;
public CustomerX : any;
public DriverX : any;
public days : number;
public tableArr : number[];
  checkTransportCost(){
      this.totalTransportCost =  ((this.grossMilage*1)+(this.extraMilage*1))* this.chargePerKm;
  }

  populateForm1(guide : Guide){
      this.service.formData = Object.assign({},guide);
  }

  selectChangeHandler(event: any){
      this.service.GetSingleGuid(event.target.value).subscribe(data=>
     {
      this.GuideX = data;
      this.guidePrice =this.GuideX.Price
      this.TotalDAndGPrice =   this.rate*1 + this.guidePrice*1;
     });
  }

  selectChangeHandlerCustomer(event: any){
    // this.numberOfPeople = event.target.value;

    this.service2.GetSingleCustomer(event.target.value).subscribe(data=>
      {
       this.CustomerX = data;
       this.numberOfPeople = this.CustomerX.NoPeople;
       this.days= this.CustomerX.NoDays
      //  for (let index = 0; index < this.tableArr.length; index++) {
      //     this.service2.table[index] = index;
         
      //  }
      
      });
  }

  selectChangeHandlerDriver(event: any){
    this.service4.GetSingleDriver(event.target.value).subscribe(data=>
      {
       this.DriverX= data;
       this.rate = this.DriverX.Rate
      });
  }
  

  selectChangeHandler1(event: any){
      this.TotalDAndGPrice = event.target.value*1 + this.rate*1;
  }

  

  selectChangeHandlerVehicle(event: any){
      this.chargePerKm = event.target.value;
      this.totalTransportCost = ((this.grossMilage*1)+(this.extraMilage*1))* this.chargePerKm;
  }



  ngOnInit(): void {
      this.service.refreshList(); 
      this.service1.refreshList();
      this.service2.refreshList();
      this.service3.refreshList();
      this.service4.refreshList();
      this.resetForm();
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