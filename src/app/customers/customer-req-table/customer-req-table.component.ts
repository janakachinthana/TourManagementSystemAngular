
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CustomerReqTableDataSource } from './customer-req-table-datasource';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';

@Component({
  selector: 'app-customer-req-table',
  templateUrl: './customer-req-table.component.html',
  styleUrls: ['./customer-req-table.component.scss']
})
export class CustomerReqTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Customer>;
  dataSource: CustomerReqTableDataSource;
  constructor(private service: CustomerService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'nationality', 'phone', 'email', 'nopeople', 'nochildren', 'arrivaldate', 'departuredate', 'starcategory', 'remark', 'tourexecutive', 'exchangerate'];

  ngOnInit() {
    this.dataSource = new CustomerReqTableDataSource(this.service.list);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
