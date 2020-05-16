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
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js'


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
  public customerName : String = null;
  public Nationality : String = null;
  public Email : String = null;
  public Contact : String = null;
  public CustomerName : String = null;


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

  public HomeHotelID:any;
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
  public MealPlan: any ;
  public MealSingle: any ;

  public TotalMealAnddRooms:any =0;
  public Total3: number;
  public SubTotal: number;
  public totalSightSeeingCharges: number = 0;

  public NameDestination: String;
  public DestinationDuration: String;
  public Rules: String;
  public Description: String;
  public HomeDestinationID: number;
  public adultPrice: number = 0;
  public childPrice: number = 0;
  public TotalSightSeenCost: number = 0;

  public totalTransportationCost: number = 0;
  public GuideAndDriverTotal: number = 0;
  public TotalExpenses: number = 0;

  public CompanyProfitPrasentage: number = 0;
  public AgentProfitPrasentage: number = 0;
  public comanyProfit: number = 0;
  public AgentProfit: number = 0;
  public OverollCost: number = 0.00;
  public CompanyPres: number = 0;

  public GuideX : any;
  public DestinationX : any;
  public CustomerX : any;
  public DriverX : any;
  public days : number;
  public tableArr : number[];
  public VehicleX : any;
  public HotelX: any;

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
              private toastr : ToastrService,
              private router: Router
) { }

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

       this.TotalSightSeenCost = ((this.childPrice * 1) * this.numberOfChild * 1) + ((this.adultPrice * 1) * this.numberOfAudult * 1);

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
        TotalSightSeenCost: this.TotalSightSeenCost

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

    this.MealSingle = event.target.value;
    this.MealPlan = event.target.value * this.numberOfPeople;
    this.serviceHomeHotel.formData.MealPlan = this.MealPlan;

    if (event.target.value == this.RoomOnly) {

      this.currentMealPlanName = "Room Only";
      this.serviceHomeHotel.formData.currentMealPlan = this.currentMealPlanName;
    } else if (event.target.value == this.BedAndBreakfast) {

      this.currentMealPlanName = "Bed And Breakfast";
      this.serviceHomeHotel.formData.currentMealPlan = this.currentMealPlanName;
    } else if (event.target.value == this.FullBoard) {

      this.currentMealPlanName = "Full Board";
      this.serviceHomeHotel.formData.currentMealPlan = this.currentMealPlanName;
    } else if (event.target.value == this.HalfBoard) {

      this.currentMealPlanName = "Half Board";
      this.serviceHomeHotel.formData.currentMealPlan = this.currentMealPlanName;
    }else{
      this.currentMealPlanName = "Not Specified";
      this.serviceHomeHotel.formData.currentMealPlan = this.currentMealPlanName;
    }
  }

  selectChangeHandlerHotel(event: any){


    this.service7.GetSingleHotel(event.target.value).subscribe(data=>{
       this.HotelX = data;
          this.HotelNameandAddress = this.HotelX.HotelName;
          this.RoomOnly =  this.HotelX.RoomOnly;
          this.BedAndBreakfast = this.HotelX.BedAndBreackfast;
          this.FullBoard = this.HotelX.FullBoard;
          this.HalfBoard = this.HotelX.HalfBoard;
          this.Single = this.HotelX.Single;
          this.Double = this.HotelX.Double;
          this.Triple = this.HotelX.Triple;
          this.Quard = this.HotelX.Quard;
          this.King = this.HotelX.King;
          this.Queen = this.HotelX.Queen;



          this.serviceHomeHotel.formData ={
            HomeHotelID: this.HomeHotelID,
            date: this.serviceHomeHotel.formData.date,
            hotelName: this.HotelNameandAddress,
            MealPlan: this.MealPlan,
            currentMealPlan: this.currentMealPlanName,

            SingleRoomCount: this.serviceHomeHotel.formData.SingleRoomCount,
            DoubleRoomCount: this.serviceHomeHotel.formData.DoubleRoomCount,
            TripleRoomCount: this.serviceHomeHotel.formData.TripleRoomCount,
            GuidedRoomCount: this.serviceHomeHotel.formData.GuidedRoomCount,
            singleRoomCost: this.Single,
            doubleRoomCost: this.Double,
            tripleRoomCost: this.Triple,
            guideRoomCost: this.Single,
            TotalMealAnddRooms:this.TotalMealAnddRooms

          }


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
       this.CustomerName = this.CustomerX.Name;
       this.Nationality = this.CustomerX.Nationality;
       this.Email = this.CustomerX.Email;
       this.Contact = this.CustomerX.Phone;
       this.serviceHome.formData.customerName  = this.CustomerX.Name;
       this.serviceHome.formData.numberOfAdult  = this.CustomerX.NoPeople;
       this.serviceHome.formData.numberOfChild  = this.CustomerX.NoChildren;
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
      this.serviceHomeHotel.refreshList();
      this.serviceHomeDestination.refreshList();
  }

resetForm(form? : NgForm){
if(form != null)
form.resetForm();
this.serviceHome.formData ={
    homeID: null,
    customerName: null,
    TotalExpenses: null,
    CompanyPresentage: null,
    AgentProfitPrasentage: null,
    comanyProfit: null,
    AgentProfit: null,
    numberOfAdult: null,
    numberOfChild: null,
    OverollCost: null,
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
  TotalSightSeenCost: null,


}
this.serviceHomeHotel.formData ={
  HomeHotelID: null,
  date: null,
  hotelName: null,
  MealPlan: null,
  currentMealPlan: null,
  SingleRoomCount: null,
  DoubleRoomCount: null,
  TripleRoomCount: null,
  GuidedRoomCount: null,
  singleRoomCost: null,
  doubleRoomCost: null,
  tripleRoomCost: null,
  guideRoomCost: null,
  TotalMealAnddRooms:null,

}


}


onSubmit(form : NgForm){

if(form.value.homeID == null )
{

if(form.value.customerName == null || this.CompanyPres == null)
{
this.toastr.warning('Select a Customer', 'Elephas Vacation');
}
else
{
  this.insertRecord(form);
  this.downloadPDF();
  this.testRemove();
  this.toastr.success('Package is built successfully..!', 'Elephas Vacation');
  this.router.navigateByUrl('estimatedTours');

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
// this.serviceHome.formData.CompanyPresentage = this.serviceHome.formData.CompanyPresentage;

this.serviceHome.postHome(form.value).subscribe(res =>{


});

// for (let index = 0; index < this.dataarry.length; index++) {
//   this.serviceHomeHotel.postHomeHotel(this.dataarry[index]).subscribe(res =>{
//     this.toastr.success('Insert successfully', 'Eliphase');
//     this.serviceHomeHotel.refreshList();
//   });

// }

// this.totalRoomCharges = 0;
// this.totalMealPlanCost = 0;
// this.totalMealAndRoomChargesValue = 0;
}


addDestination(form : NgForm){

   if(this.serviceHomeDestination.formData.adultPrice == null || this.serviceHomeDestination.formData.childPrice == null){
      this.toastr.warning('Please Select a Destination', 'Eliphase');

    }else if(this.serviceHomeDestination.formData.numberOfAudult == null || this.serviceHomeDestination.formData.numberOfChild == null) {
      this.toastr.warning('Please Select a Customer', 'Eliphase');

    }else{
      this.serviceHomeDestination.postDestination(form.value).subscribe(res =>{
      this.toastr.success('Insert successfully', 'Eliphase');
      // this.resetForm();
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
        TotalSightSeenCost: null,


    }
      // this.serviceHome.refreshList();
      this.serviceHomeDestination.refreshList();
      });
    }
}

addHotel(form : NgForm){
  if (this.serviceHomeHotel.formData.date == null) {
    this.toastr.warning('Please Select a Date', 'Eliphase');

  }else if(this.serviceHomeHotel.formData.hotelName == null){
    this.toastr.warning('Please Select a Hotel', 'Eliphase');

  }else if(this.serviceHomeHotel.formData.MealPlan == null){
    this.toastr.warning('Please Select a Meal Plan', 'Eliphase');

  }else if(this.serviceHomeHotel.formData.SingleRoomCount == null){
    this.toastr.warning('Single Room count should be 0 or more...!', 'Eliphase');

  }else if (this.serviceHomeHotel.formData.DoubleRoomCount == null) {
    this.toastr.warning('Double Room count should be 0 or more...!', 'Eliphase');

  }else if (this.serviceHomeHotel.formData.TripleRoomCount == null) {
    this.toastr.warning('Trible Room count should be 0 or more...!', 'Eliphase');

  }else if (this.serviceHomeHotel.formData.GuidedRoomCount == null) {
    this.toastr.warning('Guide Room count should be 0 or more...!', 'Eliphase');

  }else if (this.serviceHomeHotel.formData.TotalMealAnddRooms <= 0) {
    this.toastr.warning('Please check the total...!', 'Eliphase');

  }else{
      this.serviceHomeHotel.postHomeHotel(form.value).subscribe(res =>{
      this.toastr.success('Insert successfully', 'Eliphase');
      // this.resetForm();
      this.serviceHomeHotel.formData ={
        HomeHotelID: null,
        date: null,
        hotelName: null,
        MealPlan: null,
        currentMealPlan: null,
        SingleRoomCount: null,
        DoubleRoomCount: null,
        TripleRoomCount: null,
        GuidedRoomCount: null,
        singleRoomCost: null,
        doubleRoomCost: null,
        tripleRoomCost: null,
        guideRoomCost: null,
        TotalMealAnddRooms:null,

      }
      // this.serviceHome.refreshList();
      this.serviceHomeHotel.refreshList();
      this.TotalMealAnddRooms = 0;
      this.MealPlan = 0;
      });

  }

}

calcTotMEalAndRoom(){

    this.TotalMealAnddRooms =  (this.MealPlan * 1)
            + ((this.serviceHomeHotel.formData.SingleRoomCount * 1) * (this.serviceHomeHotel.formData.singleRoomCost * 1))
            + ((this.serviceHomeHotel.formData.DoubleRoomCount * 1) * (this.serviceHomeHotel.formData.doubleRoomCost * 1))
            + ((this.serviceHomeHotel.formData.TripleRoomCount * 1) * (this.serviceHomeHotel.formData.tripleRoomCost * 1))
            + ((this.serviceHomeHotel.formData.GuidedRoomCount * 1) * (this.serviceHomeHotel.formData.guideRoomCost * 1));

    this.serviceHomeHotel.formData.TotalMealAnddRooms = this.TotalMealAnddRooms;
}


calcTot(){

  this.totalRoomCharges = 0;
  this.totalMealPlanCost = 0;
  this.totalMealAndRoomChargesValue = 0;
  this.totalTransportationCost = 0;
  this.GuideAndDriverTotal = 0;


  for (let index = 0; index <= this.serviceHomeHotel.list.length; index++) {

    this.totalRoomCharges =  this.totalRoomCharges + ((this.serviceHomeHotel.list[index].SingleRoomCount * 1) * (this.serviceHomeHotel.list[index].singleRoomCost * 1))+
    ((this.serviceHomeHotel.list[index].DoubleRoomCount * 1) * (this.serviceHomeHotel.list[index].doubleRoomCost * 1))+
    ((this.serviceHomeHotel.list[index].TripleRoomCount * 1) * (this.serviceHomeHotel.list[index].tripleRoomCost * 1))+
    ((this.serviceHomeHotel.list[index].GuidedRoomCount * 1) * (this.serviceHomeHotel.list[index].guideRoomCost * 1));

    this.totalMealPlanCost =  this.totalMealPlanCost + (this.serviceHomeHotel.list[index].MealPlan * 1) ;
    this.totalMealAndRoomChargesValue = ((this.totalMealPlanCost * 1) + (this.totalRoomCharges * 1));
    this.totalTransportationCost = this.totalTransportCost;
    this.GuideAndDriverTotal = this.TotalDAndGPrice;
    this.calcSightSeeing();

  }

}

calcSightSeeing(){
  this.totalSightSeeingCharges = 0;
  this.serviceHomeDestination.refreshList;
  for (let index = 0; index <= this.serviceHomeDestination.list.length; index++) {

    this.totalSightSeeingCharges = ( this.totalSightSeeingCharges * 1)
    + (this.serviceHomeDestination.list[index].TotalSightSeenCost * 1) ;

    this.TotalExpenses = this.totalTransportationCost
                           + this.GuideAndDriverTotal
                           + this.totalMealAndRoomChargesValue
                           + this.totalSightSeeingCharges;
     this.serviceHome.formData.TotalExpenses = this.TotalExpenses;

  }

};

calOverOll(form : NgForm){
  this.OverollCost = (this.TotalExpenses * 1)
                     + ((this.TotalExpenses * 1) * ((form.value.CompanyPresentage* 1) / 100))
                     + ((this.TotalExpenses * 1) * ((form.value.AgentProfitPrasentage * 1) / 100));

  this.serviceHome.formData.comanyProfit = ((this.TotalExpenses * 1) * ((form.value.CompanyPresentage* 1) / 100));

  this.serviceHome.formData.AgentProfit =  ((this.TotalExpenses * 1) * ((form.value.AgentProfitPrasentage * 1) / 100));

  this.serviceHome.formData.OverollCost =  this.OverollCost;
  // this.serviceHome.formData.CompanyPresentage = (this.CompanyPres * 1);

  // this.serviceHome.formData.CompanyProfitPrasentage = this.CompanyProfitPrasentage;
  // this.serviceHome.formData.AgentProfitPrasentage = this.AgentProfitPrasentage;



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
     });
}


for (let index = 0; index < this.serviceHomeDestination.list.length; index++) {
  this.serviceHomeDestination.deleteDestination(this.serviceHomeDestination.list[index].HomeDestinationID).subscribe(res=>{
  this.service.refreshList();
     });
}

}


@ViewChild('content')content: ElementRef;

public downloadPDF(){
  const options = {
    filename : 'Employee Report',
    image: {type: 'jpeg', quality: 1 },
    html2canvas:  { scale : 5},
    margin : 10,
    jsPDF:{ format: 'letter', orientation: 'landscape',putOnlyUsedFonts:true}
  };
  const content: Element = document.getElementById('container');

  html2pdf()
    .from(content)
    .set(options)
    .save();
}

}
