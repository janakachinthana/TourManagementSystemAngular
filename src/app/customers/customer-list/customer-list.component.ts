import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerService } from './../../shared/customer.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerComponent } from '../customer/customer.component';
import { ReportingService } from 'src/app/shared/reporting.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 100;
  constructor(public service: CustomerService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private reporting: ReportingService) { }

  ngOnInit(): void {
  this.service.refreshList();
  if (this.service.list == null) { // this.service.length == 0, I changed it
     this.service.list = [];
    }
  }

  populateForm(cus: Customer) {
  this.service.formData = Object.assign({}, cus);
  this.AddOrEditCustomer(cus);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteCustomer(id).subscribe(res => {
      this.service.refreshList();
      this.toastr.warning('Deleted Record Successfully', 'Elephas Vacations | Register');
    });
    }
  }

  AddOrEditCustomer(cus: Customer) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '94%';
    dialogConfig.data = {cus};
    this.dialog.open(CustomerComponent, dialogConfig);
  }


  // download pdf - table report is generated using this method
  downloadRequest(id: number, selection: number, type: number) {  // this is same method in the customer component

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

    @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
