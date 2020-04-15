
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { HotelsComponent } from './hotels/hotels.component';
import { GuidesComponent } from './guides/guides.component';
import { MainComponent } from "./main/main.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { ConfirmedTourComponent } from "./confirmed-tour/confirmed-tour.component";
import { CompletedTourComponent } from "./completed-tour/completed-tour.component";
import { LoginComponent } from './user/login/login.component';
import { UsersListComponent } from './User/users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { CustomersComponent } from './customers/customers.component';
import { DriversComponent } from './drivers/drivers.component';



const routes: Routes = [

  
  { path : '', component : UsersListComponent},
  { path : 'customer', component : CustomersComponent},
  { path : 'employee', component : EmployeeComponent},
  { path : 'destination', component : DestinationsComponent},
  { path : 'hotel', component : HotelsComponent},
  { path : 'guide', component : GuidesComponent},
  { path : 'main', component : MainComponent},
  { path : 'home', component : HomeComponent},
  { path : 'vehicle', component : VehiclesComponent},
  { path : 'confirmed', component : ConfirmedTourComponent},
  { path : 'completed', component : CompletedTourComponent},
  { path : 'employee', component : EmployeeComponent},
  { path : 'destination', component : DestinationsComponent},
  { path : 'hotel', component : HotelsComponent},
  { path : 'driver', component : DriversComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
