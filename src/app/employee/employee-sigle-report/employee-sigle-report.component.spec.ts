import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSigleReportComponent } from './employee-sigle-report.component';

describe('EmployeeSigleReportComponent', () => {
  let component: EmployeeSigleReportComponent;
  let fixture: ComponentFixture<EmployeeSigleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSigleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSigleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
