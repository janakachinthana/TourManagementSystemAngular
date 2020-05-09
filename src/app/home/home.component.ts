import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GuideService } from 'src/app/shared/guide.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Guide } from 'src/app/shared/guide.model';
import { DestinationService } from 'src/app/shared/destination.service';
import { Destination } from '../shared/destination.model';
import { CustomerService } from '../shared/customer.service';
import { VehicleService } from '../shared/vehicle.service';
import { DriverService } from '../shared/driver.service';
import { HotelCosting } from '../shared/hotel-costing.model';
import { EmployeeService } from '../shared/employee.service';
import { HomeServiceService } from '../shared/home-service.service';
import { Home } from '../shared/home.model';
import { HomeHotelService } from '../shared/home-hotel.service';
import { HotelService } from '../shared/hotel.service';
import * as jsPDF from 'jspdf';
import { HomeHotel } from '../shared/home-hotel.model';
import { HomeDestinationService } from '../shared/home-destination.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  UserName : String;
  hotelCosting=new HotelCosting()
  dataarry=[];
  HomeHotelArray : HomeHotel[];
  myDate = Date.now();
  ID : any;
  janaka : String = "jan";

  public TotalDAndGPrice : number = null;
  public selectedDay2 : number = null;
  
 
  public grossMilage : number;
  public extraMilage : number;
  public chargePerKm : number;
  public totalMilage : number;
  public totalTransportCost : number;

  public VehicalNumber : String;
  public VehicalModel : string; 
  public numberOfSeats : number; 
  public OwnerName : String;
  public OwnerContact : String;

  public numberOfPeople : number = null;
  public numberOfAudult : number = null;
  public numberOfChild : number = null;


  public driverFirstName : number;
  public driverLastName : number;
  public driverContact : number;
  public driverFee : number;
  public rate : number; 
  public DriverRate : number; 

  public guidePrice : number = null;
  public GuideFirstName : String;
  public GuideLastName : String;
  public GuideContact : String;

  public RoomOnly: any;
  public BedAndBreakfast: number;
  public FullBoard: number;
  public HalfBoard: number;

  public currentMealPlanName: any;
  public totalMealAndRoomChargesValue: any = 0;
  public totalRoomCharges: any = 0;
  public totalMealPlanCost: any = 0;

  public Single: number;
  public Double: number;
  public Triple: number;
  public Quard: number;
  public King: number;
  public Queen: number;
  public HotelNameandAddress: any;


  public SingleRoomCount: number;
  public DoubleRoomCount: number;
  public TripleRoomCount: number;
  public GuidedRoomCount: number;

  public SingleRoomTotalCost: any = 0;
  public DoubleRoomTotalCost: any= 0;
  public TribleRoomTotalCost: any= 0;
  public GuideRoomTotalCost: any= 0;

  public MealPlan: number ;

  public Total3: number;
  public SubTotal: number;

  public NameDestination: String;
  public DestinationDuration: String;
  public Rules: String;
  public Description: String;
  public HomeDestinationID: number;
  public adultPrice: number = 0;
  public childPrice: number = 0;


  constructor(public service: GuideService,
              public service1 : DestinationService,
              public service2: CustomerService,
              public service3: VehicleService,
              public service4: DriverService,
              public service5: EmployeeService,
              public service6: DestinationService,
              public service7: HotelService,
              public serviceHome: HomeServiceService,
              public serviceHomeHotel: HomeHotelService,
              public serviceHomeDestination: HomeDestinationService,
              private toastr : ToastrService
) { }

public GuideX : any;
public DestinationX : any;
public CustomerX : any;
public DriverX : any;
public days : number;
public tableArr : number[];
public VehicleX : any;
public HotelX: any;

addForm(){
  this.hotelCosting = new HotelCosting()
  this.dataarry.push(this.hotelCosting);
}

removeForm(index){
  this.dataarry.splice(index);
}

  checkTransportCost(){
      this.totalTransportCost =  ((this.grossMilage*1)+(this.extraMilage*1))* this.chargePerKm;
  }

  Total(){

    // this.HomeHotelArray.values = this.dataarry.values;
    
    // for (let index = 0; index < this.HomeHotelArray.length; index++) {

    //   this.SubTotal = (this.HomeHotelArray.MealPlan * this.HomeHotelArray.numberOfPeople) 
    //   + (this.HomeHotelArray.SingleRoomCount * this.Single)
    //    + (this.HomeHotelArray.DoubleRoomCount * this.Double)
    //     + (this.HomeHotelArray.SingleRoomCount * this.Triple)
    //      + (this.HomeHotelArray.GuidedRoomCount * this.Single);

    //      this.Total3 = this.Total3 + this.SubTotal;
      
    // }
      
  }

  populateForm1(guide : Guide){
      this.service.formData = Object.assign({},guide);
  }

  selectChangeHandlerDestination(event: any){
    this.service1.GetSingleHomeDestination(event.target.value).subscribe(data=>
      {
       this.DestinationX = data;
       this.NameDestination = this.DestinationX.DestinationName;
       this.adultPrice = this.DestinationX.EntranceFee;
       this.childPrice = this.DestinationX.EntranceFeeChild;
       this.HomeDestinationID = this.DestinationX.DestinationID;
       this.DestinationDuration = this.DestinationX.Time;
       this.Rules = this.DestinationX.RulesAndRegulations;
       this.Description = this.DestinationX.DescriptionOfThePlace;
       

      this.serviceHomeDestination.formData ={ 
        HomeDestinationID: this.HomeDestinationID,
        NameDestination: this.NameDestination,
        adultPrice: this.adultPrice,
        childPrice: this.childPrice,
        Description: this.Description,
        DestinationDuration: this.DestinationDuration,
        Rules: this.Rules,
        numberOfAudult: this.numberOfAudult,
        numberOfChild: this.numberOfChild,
       
    
    } 

      });
      

  }

  selectChangeHandlerGuide(event: any){
      this.service.GetSingleGuid(event.target.value).subscribe(data=>
     {
      this.GuideX = data;
      this.guidePrice =this.GuideX.Price;
      this.GuideFirstName = this.GuideX.FirstName;
      this.GuideLastName = this.GuideX.LastName;
      this.GuideContact = this.GuideX.ContactNo;
      
      if (this.rate > 0) {
        this.TotalDAndGPrice =   this.rate*1 + this.guidePrice*1;
      }
      else if (this.rate == 0){
        this.TotalDAndGPrice =   this.guidePrice*1;
      }
     });
  }

  selectChangeHandlerMealPlan(event : any){

    this.MealPlan = event.target.value;

    if (event.target.value == this.RoomOnly) {

      this.currentMealPlanName = "Room Only";
      
    } else if (event.target.value == this.BedAndBreakfast) {
     
      this.currentMealPlanName = "Bed And Breakfast";

    } else if (event.target.value == this.FullBoard) {

      this.currentMealPlanName = "Full Board";
      
    } else if (event.target.value == this.HalfBoard) {
      
      this.currentMealPlanName = "Half Board";

    }else{
      this.currentMealPlanName = "Not Specified";
    }
  }

  selectChangeHandlerHotel(event: any){


    this.service7.GetSingleHotel(event.target.value).subscribe(data=>
      {
       this.HotelX = data;
       this.RoomOnly =  this.HotelX.RoomOnly;
       this.HotelNameandAddress = this.HotelX.HotelName;
          this.BedAndBreakfast = this.HotelX.BedAndBreackfast;
          this.FullBoard = this.HotelX.FullBoard;
          this.HalfBoard = this.HotelX.HalfBoard;
          this.Single = this.HotelX.Single;
          this.Double = this.HotelX.Double;
          this.Triple = this.HotelX.Triple;
          this.Quard = this.HotelX.Quard;
          this.King = this.HotelX.King;
          this.Queen = this.HotelX.Queen;
      
      
      });
  }
    
  //   event : any){

  //     this.service7.GetSingleHotel(event.target.value).subscribe(data=>
  //       {
  //         this.HotelX = data;
  //         this.RoomOnly =  this.HotelX.RoomOnly*1;
  //         this.BedAndBreakfast = this.HotelX.BedAndBreackfast;
  //         this.FullBoard = this.HotelX.FullBoard;
  //         this.HalfBoard = this.HotelX.HalfBoard;
  //         this.Single = this.HotelX.Single;
  //         this.Double = this.HotelX.Double;
  //         this.Triple = this.HotelX.Triple;
  //         this.Quard = this.HotelX.Quard;
  //         this.King = this.HotelX.King;
  //         this.Queen = this.HotelX.Queen;
  //       });

  // }

  selectChangeHandlerCustomer(event: any){
    // this.numberOfPeople = event.target.value;

    this.service2.GetSingleCustomer(event.target.value).subscribe(data=>
      {
       this.CustomerX = data;
       this.days= this.CustomerX.NoDays;
       this.numberOfAudult = this.CustomerX.NoPeople;
       this.numberOfChild = this.CustomerX.NoChildren;
        this.numberOfPeople = (this.numberOfAudult * 1) + (this.numberOfChild * 1);
      });
  }

  selectChangeHandlerDriver(event: any){
    this.service4.GetSingleDriver(event.target.value).subscribe(data=>
      {
       this.DriverX= data;
       this.rate = this.DriverX.Rate;
       this.driverFirstName = this.DriverX.FirstName;
       this.driverLastName = this.DriverX.LastName;
       this.driverContact = this.DriverX.PhoneNumber

      });
  }
  

  selectChangeHandler1(event: any){
      this.TotalDAndGPrice = event.target.value*1 + this.rate*1;
  }

  

  selectChangeHandlerVehicle(event: any){

    this.service3.GetSingleVehicle(event.target.value).subscribe(data=>
      {
        this.VehicleX= data;
        this.DriverRate = this.VehicleX.RatePerKM;
        this.chargePerKm = this.DriverRate;
        this.VehicalModel = this.VehicleX.Model;
        this.VehicalNumber = this.VehicleX.VehicleNo;
        this.numberOfSeats = this.VehicleX.NoOfSeats;
        this.OwnerName = this.VehicleX.OwnersName;
        this.OwnerContact = this.VehicleX.OwnersContact;
        this.totalTransportCost = (this.totalMilage*1)* this.DriverRate;
        this.totalMilage = this.grossMilage*1 + this.extraMilage*1;
      });
     
  };

  ngOnInit(): void {
    this.ID = Math.floor(100 + Math.random() * 900).toString;
      this.service.refreshList(); 
      this.service1.refreshList();
      this.service2.refreshList();
      this.service3.refreshList();
      this.service4.refreshList();
      this.service6.refreshList();
      this.service7.refreshList();
      
      this.resetForm();
      this.hotelCosting=new HotelCosting();
      this.dataarry.push(this.hotelCosting);
      this.UserName = this.service5.UserName.FirstName;
  }

resetForm(form? : NgForm){
if(form != null)
form.resetForm();
this.serviceHome.formData ={ 
    homeID: null,
    hotelID:null,
    grossMilage: null,
    extraMilage: null,
    customerID: null,
    vehicalID: null,
    driverID: null,
    guideID: null,
}   

this.serviceHomeDestination.formData ={ 
    HomeDestinationID: null,
    NameDestination: null,
    adultPrice: null,
    numberOfAudult: null,
    childPrice: null,
    numberOfChild: null,
    Description: null,
    DestinationDuration: null,
    Rules: null,
    

} 

} 


onSubmit(form : NgForm){
 
if(form.value.homeID == null )
{

if(form.value.customerID == '')
{
this.toastr.warning('Insert faild', 'Eliphase');
}
else
{
this.insertRecord(form);
}
}

else{
if(form.value.homeID !=null)
this.updateRecord(form);
else
this.toastr.warning('Update faild', 'Eliphase');
}

// for (let index = 0; index < this.serviceHomeHotel.list.length; index++) {
  
//   // this.service7.GetSingleHotel()
//   // this.serviceHomeHotel.deleteHomeHotel(this.serviceHomeHotel.list[index].HomeHotelID).subscribe(res=>{
//   //   this.service.refreshList();
//   //   this.toastr.warning('Deleted successfully', ' Elephas vacations',{
//   //     progressBar :true,
//   //     positionClass:'toast-top-right',
//   //     easing:'ease-in'
//   //   });    });
  
// }
// for (let index = 0; index < this.dataarry.length; index++) {
//       this.SingleRoomTotalCost = (this.SingleRoomTotalCost *1) + ((this.dataarry[index].SingleRoomCount*1)*(this.dataarry[index].singleRoomCost*1));
//       this.DoubleRoomTotalCost = (this.DoubleRoomTotalCost *1)+ ((this.dataarry[index].SingleRoomCount*1)*(this.dataarry[index].singleRoomCost*1));
//       this.TribleRoomTotalCost = (this.TribleRoomTotalCost*1) + ((this.dataarry[index].SingleRoomCount*1)*(this.dataarry[index].singleRoomCost*1));
//       this.GuideRoomTotalCost = (this.GuideRoomTotalCost*1) + ((this.dataarry[index].SingleRoomCount*1)*(this.dataarry[index].singleRoomCost*1));

//       this.totalDayCostValue = (this.SingleRoomTotalCost*1);
// }

}

insertRecord(form : NgForm){

  
// this.serviceHome.postHome(form.value).subscribe(res =>{
// this.toastr.success('Insert successfully', 'Eliphase');
// this.resetForm(form);
// this.serviceHome.refreshList();
// });

for (let index = 0; index < this.dataarry.length; index++) {
  this.serviceHomeHotel.postHomeHotel(this.dataarry[index]).subscribe(res =>{
    this.toastr.success('Insert successfully', 'Eliphase');
    this.serviceHomeHotel.refreshList();
  });

}

this.totalRoomCharges = 0;
this.totalMealPlanCost = 0;
this.totalMealAndRoomChargesValue = 0;
}


addDestination(form : NgForm){

  
this.serviceHomeDestination.postDestination(form.value).subscribe(res =>{
this.toastr.success('Insert successfully', 'Eliphase');
this.resetForm();
// this.serviceHome.refreshList();
this.serviceHomeDestination.refreshList();
});

}


calcTot(){

  this.totalRoomCharges = 0;
  this.totalMealPlanCost = 0;
  this.totalMealAndRoomChargesValue = 0;
  for (let index = 0; index <= this.serviceHomeHotel.list.length; index++) {
  
    this.totalRoomCharges =  this.totalRoomCharges + ((this.serviceHomeHotel.list[index].SingleRoomCount * 1) * (this.serviceHomeHotel.list[index].singleRoomCost * 1))+
    ((this.serviceHomeHotel.list[index].DoubleRoomCount * 1) * (this.serviceHomeHotel.list[index].doubleRoomCost * 1))+
    ((this.serviceHomeHotel.list[index].TripleRoomCount * 1) * (this.serviceHomeHotel.list[index].tripleRoomCost * 1))+
    ((this.serviceHomeHotel.list[index].GuidedRoomCount * 1) * (this.serviceHomeHotel.list[index].guideRoomCost * 1));  
   
    this.totalMealPlanCost =  this.totalMealPlanCost + (this.serviceHomeHotel.list[index].MealPlan * 1) ;
    this.totalMealAndRoomChargesValue = ((this.totalMealPlanCost * 1) + (this.totalRoomCharges * 1));
  }

 
}

updateRecord(form : NgForm){
this.serviceHome.putHome(form.value).subscribe(res =>{
this.toastr.info('Updated successfully', 'Eliphase');
this.resetForm(form);
this.serviceHome.refreshList();
});
}

populateForm(home : Home){
  this.serviceHome.formData = Object.assign({},home);
}

onDelete(id : number){
  if(confirm('Are you sure to delete this record?')){
  this.serviceHome.deleteHome(id).subscribe(res=>{
     this.serviceHome.refreshList();
     this.toastr.warning('deleted successfully', 'DES.Register');
  });
}
}

testRemove(){
  for (let index = 0; index < this.serviceHomeHotel.list.length; index++) {
    this.serviceHomeHotel.deleteHomeHotel(this.serviceHomeHotel.list[index].HomeHotelID).subscribe(res=>{
    this.service.refreshList();
    this.toastr.warning('Deleted successfully', ' Elephas vacations',{
      progressBar :true,
      positionClass:'toast-top-right',
      easing:'ease-in'
    });    });
}
}


@ViewChild('content')content: ElementRef;
  
public downloadPDF(){

  let doc =new jsPDF('landscape', 'px', 'a2') ;

  let specialElimentHandlers = {

    '#editor': function(element: any, renderer: any){
      return true;
    }

  };

  let content = this.content.nativeElement;

  doc.fromHTML(content.innerHTML, 100,15,{

    'width': 590,
    'elementHandlers': specialElimentHandlers

  });

  doc.save('janaka'+'Employee Details (Eliphase Vacation).pdf');

}

}