
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { HotelsComponent } from './hotels/hotels.component';
import { GuidesComponent } from './guides/guides.component';
import { MainComponent } from "./main/main.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { ConfirmedTourComponent } from "./confirmed-tour/confirmed-tour.component";
import { CompletedTourComponent } from "./completed-tour/completed-tour.component";
import { CustomersComponent } from './customers/customers.component';
import { DriversComponent } from './drivers/drivers.component';
import { CostingComponent } from './costing/costing.component';
import { UserComponent } from './user/user.component';
import { EmployeeService } from './shared/employee.service';
import { LoginComponent } from './user/login/login.component';



 

const routes: Routes = [
  
  { path : '', component : MainComponent } ,
  { path : 'customer', component : CustomersComponent,},
  { path : 'employee', component : EmployeeComponent, },
  { path : 'destination', component : DestinationsComponent, },
  { path : 'hotel', component : HotelsComponent, },
  { path : 'guide', component : GuidesComponent, },
  { path : 'main', component : MainComponent, },
  { path : 'home', component : HomeComponent, },
  { path : 'vehicle', component : VehiclesComponent, },
  { path : 'confirmed', component : ConfirmedTourComponent, },
  { path : 'completed', component : CompletedTourComponent, },
  { path : 'employee', component : EmployeeComponent, },
  { path : 'destination', component : DestinationsComponent,},
  { path : 'hotel', component : HotelsComponent, },
  { path : 'driver', component : DriversComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
