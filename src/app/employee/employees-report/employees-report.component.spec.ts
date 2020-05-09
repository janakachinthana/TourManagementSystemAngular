import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesReportComponent } from './employees-report.component';

describe('EmployeesReportComponent', () => {
  let component: EmployeesReportComponent;
  let fixture: ComponentFixture<EmployeesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
