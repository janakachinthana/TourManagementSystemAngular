import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { ToastrModule } from 'ngx-toastr';
 import { GoogleChartsModule } from 'angular-google-charts';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeService } from './shared/employee.service';
import { EmployeeRegisterComponent } from "./employee/employee-register/employee-register.component";
import { DestinationsComponent } from './destinations/destinations.component';
import { DestinationComponent } from './destinations/destination/destination.component';
import { DestinationListComponent } from './destinations/destination-list/destination-list.component';
import { HotelsComponent } from './hotels/hotels.component';
import { hotelComponent } from './hotels/hotel/hotel.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { GuidesComponent } from './guides/guides.component';
import { GuideComponent } from './guides/guide/guide.component';
import { GuideListComponent } from './guides/guide-list/guide-list.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleComponent } from './vehicles/vehicle/vehicle.component';
import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { VehicleService } from './shared/vehicle.service';
import { MainComponent } from './main/main.component';
import { ConfirmedTourComponent } from './confirmed-tour/confirmed-tour.component';
import { CompletedTourComponent } from './completed-tour/completed-tour.component';
// import { MaterialModule } from "./material.module";
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CustomersComponent } from "./customers/customers.component";
import { CustomerComponent } from "./customers/customer/customer.component";
import { CustomerListComponent } from "./customers/customer-list/customer-list.component";
import { CustomerReqTableComponent } from "./customers/customer-req-table/customer-req-table.component";
import { CustomerService } from './shared/customer.service';
import { DriverComponent } from './drivers/driver/driver.component';
import { DriverListComponent } from './drivers/driver-list/driver-list.component';
import { DriversComponent } from './drivers/drivers.component';
import { CostingComponent } from './costing/costing.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { LoginComponent } from './user/login/login.component';
import { EmployeesReportComponent } from './employee/employees-report/employees-report.component';
import { AdminLoginComponent } from './user/admin-login/admin-login.component';
import { WellcomPageComponent } from './home/wellcom-page/wellcom-page.component';
import { HomeReportComponent } from './home/home-report/home-report.component';
import { VehiclePrintComponent } from './vehicles/vehicle-print/vehicle-print.component';
import { PrintguidesComponent } from './guides/printguides/printguides.component';
import { EstimatedToursComponent } from './estimated-tours/estimated-tours.component';
import { EstimatedToursListComponent } from './estimated-tours/estimated-tours-list/estimated-tours-list.component';
import { EstimatedToursFormComponent } from './estimated-tours/estimated-tours-form/estimated-tours-form.component';
import { ConfirmedListComponent } from './confirmed-tour/confirmed-list/confirmed-list.component';
import { ConfirmedFormComponent } from './confirmed-tour/confirmed-form/confirmed-form.component';
import { CompletedListComponent } from './completed-tour/completed-list/completed-list.component';
import { CompletedFormComponent } from './completed-tour/completed-form/completed-form.component';





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
    hotelComponent,
    HotelListComponent,
    GuidesComponent,
    GuideComponent,
    GuideListComponent,
    VehiclesComponent,
    VehicleComponent,
    VehicleListComponent,
    MainComponent,
    ConfirmedTourComponent,
    CompletedTourComponent,
    CustomersComponent,
    CustomerComponent,
    CustomerListComponent,
    CustomerReqTableComponent,
    DriverComponent,
    DriverListComponent,
    DriversComponent,
    CostingComponent,
    UserComponent,
    UserListComponent,
    LoginComponent,
    EmployeesReportComponent,
    AdminLoginComponent,
    WellcomPageComponent,
    HomeReportComponent,
    VehiclePrintComponent,
    PrintguidesComponent,
    EstimatedToursComponent,
    EstimatedToursListComponent,
    EstimatedToursFormComponent,
    ConfirmedListComponent,
    ConfirmedFormComponent,
    CompletedListComponent,
    CompletedFormComponent,
    
   
  



   
    
    
  ],
  imports: [
    
    GoogleChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MaterialModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule


  ],
 
  providers: [EmployeeService , VehicleService, CustomerService , LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
