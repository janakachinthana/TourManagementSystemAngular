import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelReportComponent } from './hotel-report.component';

describe('HotelReportComponent', () => {
  let component: HotelReportComponent;
  let fixture: ComponentFixture<HotelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
