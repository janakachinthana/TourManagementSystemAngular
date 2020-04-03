
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
const routes: Routes = [
  { path : '', component : MainComponent},
  { path : 'employee', component : EmployeeComponent},
  { path : 'destination', component : DestinationsComponent},
  { path : 'hotel', component : HotelsComponent},
  { path : 'guide', component : GuidesComponent},
  { path : 'main', component : MainComponent},
  { path : 'home', component : HomeComponent},
  { path : 'vehicle', component : VehiclesComponent},
  { path : 'confirmed', component : ConfirmedTourComponent},
  { path : 'completed', component : CompletedTourComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
