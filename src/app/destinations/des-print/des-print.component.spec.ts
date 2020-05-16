import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesPrintComponent } from './des-print.component';

describe('DesPrintComponent', () => {
  let component: DesPrintComponent;
  let fixture: ComponentFixture<DesPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
