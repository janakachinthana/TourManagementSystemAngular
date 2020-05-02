import { Customer } from './../../shared/customer.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { CustomerService } from './../../shared/customer.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  formData: Customer;
  temp: Customer;
  //ArrivalDate: String;
  //DepartureDate: String;
  //ArrivalDate: Date = this.temp.ArrivalDate.toISOString.split("T")[0];
  //DepartureDate: Date = new Date();

  constructor(public service: CustomerService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<CustomerComponent>
              ) { }

  ngOnInit(): void {
    // this.resetForm();

    if (this.data.cus == null) {
      this.resetForm();
      } else {

        // this.ArrivalDate = this.temp.ArrivalDate.toISOString.split("T")[0];
        // this.DepartureDate = this.temp.DepartureDate.toISOString;

        // fill all the field with related data in the pop-up
        this.temp = Object.assign({}, this.data.cus);
        this.service.formData = {
          ID: this.temp.ID,
          AgentName: this.temp.AgentName,
          Name: this.temp.Name,
          Nationality: this.temp.Nationality,
          PassportNo: this.temp.PassportNo,
          Phone: this.temp.Phone,
          Email: this.temp.Email,
          NoDays: this.temp.NoDays,
          NoPeople: this.temp.NoPeople,
          NoChildren: this.temp.NoChildren,
          ArrivalDate: this.temp.ArrivalDate,
          DepartureDate: this.temp.DepartureDate,
          StarCategory: this.temp.StarCategory,
          Remarks: this.temp.Remarks,
          TourExecutive: this.temp.TourExecutive,
          ExchangeRate: this.temp.ExchangeRate,
          Status: this.temp.Status
        };
      }
  }

  resetForm(form?: NgForm) {
    if (form != null) {
    form.resetForm();
    }
    this.service.formData = {
    ID: null,
    AgentName: '',
    Name: '',
    Nationality: '',
    PassportNo: '',
    Phone: '',
    Email: '',
    NoDays: null,
    NoPeople: null,
    NoChildren: null,
    ArrivalDate: null,
    DepartureDate: null,
    StarCategory: '',
    Remarks: '',
    TourExecutive: '',
    ExchangeRate: null,
    Status: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.ID == null) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }

  }

  insertRecord(form: NgForm) {
    this.service.postCustomer(form.value).subscribe(res => {
      this.dialogRef.close();
      this.toastr.success('Inserted Succesfully', 'Elephas Vacations | Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putCustomer(form.value).subscribe(res => {
      this.toastr.info('Updated Succesfully', 'Elephas Vacations | Register');
      this.resetForm(form);
      this.service.refreshList();
      this.dialogRef.close();
    });
  }

  // this method is in customer-list component too
  // I used it here because when the pop-up is open, there should be a way to delete the record
  deleteRecord(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteCustomer(id).subscribe(res => {
      this.service.refreshList();
      this.dialogRef.close();
      this.toastr.warning('Deleted Record Successfully', 'Elephas Vacations | Register');
    });
    }
  }


}

