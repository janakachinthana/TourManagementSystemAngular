import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerService } from './../../shared/customer.service';
import { Component, OnInit, HostListener } from '@angular/core';
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

   
  AddOrEditCustomer(cus: Customer) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '94%';
    dialogConfig.data = {cus};
    this.dialog.open(CustomerComponent, dialogConfig);
  }
  
  onDelete(id : number){
    if (confirm('Are you sure to delete this Employee record?')){
    this.service.deleteCustomer(id).subscribe(res=>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', ' Elephas vacations',{
        progressBar :true,
        positionClass:'toast-top-right',
        easing:'ease-in'
      });    });
  }}
  
  

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
