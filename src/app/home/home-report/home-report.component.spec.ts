import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReportComponent } from './home-report.component';

describe('HomeReportComponent', () => {
  let component: HomeReportComponent;
  let fixture: ComponentFixture<HomeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
