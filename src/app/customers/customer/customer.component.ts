import { Customer } from './../../shared/customer.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';


import { CustomerService } from './../../shared/customer.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ReportingService } from 'src/app/shared/reporting.service';
import { strict } from 'assert';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  formData: Customer;
  temp: Customer;
  dummyData: Customer;


  constructor(public service: CustomerService,
              public reporting: ReportingService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<CustomerComponent>
              ) { }


  ngOnInit(): void {
    // this.resetForm();

    if (this.data.cus == null) {
      this.resetForm();
      } else {

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


  // to reset the form this method is used.
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

  // when user click on the submit button this method triggers
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


  // dummy data insertion
  insertDummyData() {

    // this.arrDate = new  Date ('2020-06-0100:00');  // '2020-04-01T23:23:00'
    // this.depDate = new  Date ('2020-06-0700:00');  // '2020-04-01T23:23:00'


    this.service.formData = {
      ID: null,
      AgentName: 'Harry Noah',
      Name: 'George Arthur',
      Nationality: 'UK',
      PassportNo: 'UK0012',
      Phone: '+44 1632 960501',
      Email: 'Arthur@gmail.com',
      NoDays: 7,
      NoPeople: 4,
      NoChildren: 2,
      ArrivalDate: null,
      DepartureDate: null,
      StarCategory: '3 Star',
      Remarks: 'Please make sure accommodation should be suitable for a 1 year old kid ',
      TourExecutive: 'Shashi Gamage',
      ExchangeRate: 186.52,
      Status: 'Not Confirmed'
  };
}


  // download pdf
  downloadRequest(id: number, selection: number, type: number) {
    this.reporting.downloadReport(id, selection, type).subscribe(x => {
      var fileType = type == 1 ? "application/pdf" : "application/msword";
      var fileName = type == 1 ? "report.pdf" : "report.doc";
      var newBlob = new Blob([x], { type: fileType});

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = fileName;

      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }



}// end

