import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedTourComponent } from './confirmed-tour.component';

describe('ConfirmedTourComponent', () => {
  let component: ConfirmedTourComponent;
  let fixture: ComponentFixture<ConfirmedTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
