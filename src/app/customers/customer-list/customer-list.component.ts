import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerService } from './../../shared/customer.service';
import { Component, OnInit , HostListener} from '@angular/core';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerComponent } from '../customer/customer.component';

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
              private dialog: MatDialog) { }

  ngOnInit(): void {
  this.service.refreshList();
  if (this.service.list.length == 0) {
      this.service.list = [];
    }
  }

  populateForm(cus: Customer) {
  this.service.formData = Object.assign({}, cus);
  this.AddOrEditCustomer(cus);
  }

  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
 
    this.dialog.open(CustomerComponent)
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

}
