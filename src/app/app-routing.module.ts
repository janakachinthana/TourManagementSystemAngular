import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from "./employee/employee.component";
import { DestinationsComponent } from "./destinations/destinations.component";
import { HotelsComponent } from "./hotels/hotels.component";



const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'employee', component : EmployeeComponent},
  { path : 'destination', component : DestinationsComponent},
  { path : 'hotel', component : HotelsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
