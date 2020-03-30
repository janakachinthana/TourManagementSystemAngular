import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeService } from './shared/employee.service';
import { EmployeeRegisterComponent } from './employee/employee-register/employee-register.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { DestinationComponent } from './destinations/destination/destination.component';
import { DestinationListComponent } from './destinations/destination-list/destination-list.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelComponent } from './hotels/hotel/hotel.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { GuidesComponent } from './guides/guides.component';
import { GuideComponent } from './guides/guide/guide.component';
import { GuideListComponent } from './guides/guide-list/guide-list.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerService } from './shared/customer.service';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeRegisterComponent,
    DestinationsComponent,
    DestinationComponent,
    DestinationListComponent,
    HotelsComponent,
    HotelComponent,
    HotelListComponent,
    GuidesComponent,
    GuideComponent,
    GuideListComponent,
    VehiclesComponent,
    CustomersComponent,
    CustomerComponent,
    CustomerListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot()


  ],
  entryComponents: [CustomerComponent],
  providers: [EmployeeService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
