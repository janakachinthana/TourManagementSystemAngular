import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePrintComponent } from './vehicle-print.component';

describe('VehiclePrintComponent', () => {
  let component: VehiclePrintComponent;
  let fixture: ComponentFixture<VehiclePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
